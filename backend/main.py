import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

logging.basicConfig(level=logging.DEBUG)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str
    language: str = "English" 

from openai import OpenAI

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
logging.debug("OpenAI client initialized with new interface.")

@app.get("/")
async def health_check():
    logging.debug("Health check endpoint called.")
    return {"status": "active", "message": "API is running"}

@app.post("/ask")
async def ask_question(query: Query):
    logging.debug(f"/ask endpoint called with question: '{query.question}', language: '{query.language}'")
    try:
        # Use GPT-4o by default for chat completions
        chat_response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": f"You are a helpful assistant that answers in {query.language}."
                },
                {
                    "role": "user",
                    "content": query.question
                }
            ]
        )

        answer = chat_response.choices[0].message.content.strip()
        logging.debug("ChatCompletion response generated successfully.")
        return {"answer": answer}
    except Exception as e:
        logging.exception("Error in /ask endpoint:")
        raise HTTPException(status_code=500, detail=str(e))
