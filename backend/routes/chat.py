import os
import uuid
import requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

from database import get_db
from models import ChatHistory
from resume_data import get_resume_context, RESUME

load_dotenv()

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

SYSTEM_PROMPT = f"""You are an AI assistant for {RESUME['name']}'s personal portfolio website.
Your role is to answer questions about {RESUME['name']} — their skills, experience, projects, background, and career.

IMPORTANT RULES:
- Only answer questions based on the resume/portfolio information provided below.
- Be friendly, helpful, and professional.
- Keep answers concise but complete (2-4 sentences unless more detail is needed).
- If asked something not covered in the resume, say: "I don't have that information in my resume, but feel free to reach out at {RESUME['email']}"
- Never make up information not in the resume.
- Refer to {RESUME['name']} in the third person (e.g., "Zubair has experience in...").
- If asked who you are, say you are {RESUME['name']}'s AI portfolio assistant.

=== RESUME / PORTFOLIO DATA ===
{get_resume_context()}
"""


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        raise HTTPException(
            status_code=503,
            detail="AI service not configured. Please add your GEMINI_API_KEY to backend/.env"
        )

    session_id = request.session_id or str(uuid.uuid4())

    # Retrieve conversation history (last 10 messages)
    history_rows = (
        db.query(ChatHistory)
        .filter(ChatHistory.session_id == session_id)
        .order_by(ChatHistory.timestamp.asc())
        .limit(10)
        .all()
    )

    # Build Gemini REST API request body
    contents = []
    # Add system prompt as first user turn (Gemini 1.5 flash supports system_instruction)
    for row in history_rows:
        role = "user" if row.role == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": row.message}]
        })
    # Add current user message
    contents.append({
        "role": "user",
        "parts": [{"text": request.message}]
    })

    payload = {
        "system_instruction": {
            "parts": [{"text": SYSTEM_PROMPT}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 2048,
        }
    }

    try:
        response = requests.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            json=payload,
            timeout=30
        )
        if response.status_code == 429:
            raise HTTPException(status_code=429, detail="Rate limit reached. Please wait a moment and try again.")
        response.raise_for_status()
        data = response.json()
        try:
            reply_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
        except KeyError:
            print(f"KeyError in response: {data}")
            raise HTTPException(status_code=500, detail="AI response format error, possibly hit token limit.")
    except HTTPException:
        raise
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="AI service timed out. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

    # Save to DB
    db.add(ChatHistory(session_id=session_id, role="user", message=request.message))
    db.add(ChatHistory(session_id=session_id, role="model", message=reply_text))
    db.commit()

    return ChatResponse(reply=reply_text, session_id=session_id)


@router.get("/history/{session_id}")
async def get_history(session_id: str, db: Session = Depends(get_db)):
    rows = (
        db.query(ChatHistory)
        .filter(ChatHistory.session_id == session_id)
        .order_by(ChatHistory.timestamp.asc())
        .all()
    )
    return [
        {
            "role": r.role,
            "message": r.message,
            "timestamp": r.timestamp.isoformat(),
        }
        for r in rows
    ]
