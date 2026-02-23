import os
import requests

API_KEY = "AIzaSyDZWd6WmSKvwgu7nUSHoUDQLsxcXdYFlFY"

models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash"
]

payload = {
    "contents": [{"role": "user", "parts": [{"text": "hello"}]}],
    "generationConfig": {"maxOutputTokens": 1024}
}

for model in models:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
    print(f"Testing {model}...")
    try:
        res = requests.post(url, json=payload, timeout=10)
        print(f"  Status: {res.status_code}")
        if res.status_code == 200:
            try:
                text = res.json()['candidates'][0]['content']['parts'][0]['text'].strip()
                print(f"  SUCCESS! Response: {text}")
                break
            except KeyError:
                print(f"  Failed with KeyError. Raw JSON: {res.json()}")
        elif res.status_code != 404:
            print(f"  Error {res.status_code}: {res.text[:100]}")
    except Exception as e:
        print(f"  Failed: {e}")
