from fastapi import APIRouter
from resume_data import RESUME

router = APIRouter()


@router.get("/profile")
async def get_profile():
    return {
        "name": RESUME["name"],
        "title": RESUME["title"],
        "bio": RESUME["bio"],
        "location": RESUME["location"],
        "email": RESUME["email"],
        "phone": RESUME["phone"],
        "linkedin": RESUME["linkedin"],
        "github": RESUME["github"],
        "website": RESUME["website"],
        "languages": RESUME["languages"],
        "interests": RESUME["interests"],
    }


@router.get("/skills")
async def get_skills():
    return RESUME["skills"]


@router.get("/projects")
async def get_projects():
    return RESUME["projects"]


@router.get("/experience")
async def get_experience():
    return RESUME["experience"]


@router.get("/education")
async def get_education():
    return RESUME["education"]


@router.get("/certifications")
async def get_certifications():
    return {"certifications": RESUME["certifications"]}
