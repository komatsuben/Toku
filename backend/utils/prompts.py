import time
import os
import requests
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def summarize_chapters(chapters: list):
    results = []

    for chapter in chapters:
        prompt = f"""
            You are an assistant that summarizes textbook-style chapters into clean, concise bullet points.

            Instructions:
            - Do NOT include introductions or commentary.
            - Start immediately with bullet points.
            - Each bullet point should capture a key idea or insight.
            - Keep it short, clear, and relevant.
            - Use * for bullet points.
            - Use **bold** to highlight key concepts when appropriate.

            Title: {chapter['title']}

            Content:
            {chapter['content'][:4000]}
        """

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 500,
            "temperature": 0.5
        }

        try:
            response = requests.post(GROQ_API_URL, headers=headers, json=payload)
            response.raise_for_status()
            summary = response.json()["choices"][0]["message"]["content"].strip()
        except Exception as e:
            print(f"[GROQ ERROR] Chapter '{chapter['title']}': {e}")
            summary = "Failed to summarize this chapter."

        results.append({
            "id": chapter["id"],
            "title": chapter["title"],
            "summary": summary,
            "fullContent": chapter["content"]
        })

        time.sleep(1.5)

    return results
