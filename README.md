# Multilingual Chatbot

A responsive, multilingual chatbot application that supports both text and voice interactions. Users can type or speak their messages, and the app responds using built-in text-to-speech capabilities. The project features a modern, component-based design and is built with a Next.js/TypeScript frontend and a Python/FastAPI backend.

## Table of Contents

- [Multilingual Chatbot](#multilingual-chatbot)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Setup](#setup)
    - [Frontend](#frontend)

## Features

- **Multilingual Support:**  
  Select your preferred language from the dropdown (English, Spanish, Italian, French, etc.) – the language selector becomes disabled after the first user message is sent.
  
- **Voice Input (Speech Recognition):**  
  Use your microphone to input messages via the browser’s built-in SpeechRecognition API.

- **Text-to-Speech (TTS):**  
  Listen to the chatbot’s responses using the browser’s built-in SpeechSynthesis API (configured with a speech rate of 0.9).

- **Responsive Design:**  
  The layout adapts for different screen sizes. On smaller screens, the bottom input row shrinks to fit the available space.

- **Component-Based Architecture:**  
  The frontend code is refactored into separate components for displaying messages and handling user input.

## Tech Stack

- **Frontend:**  
  - [Next.js](https://nextjs.org/)  
  - [React](https://reactjs.org/)  
  - [TypeScript](https://www.typescriptlang.org/)  
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend:**  
  - [Python](https://www.python.org/)  
  - [FastAPI](https://fastapi.tiangolo.com/)

- **APIs:**  
  - Browser Web Speech API (for both SpeechRecognition and SpeechSynthesis)

## Setup

### Frontend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/multilingual-chatbot.git
   cd multilingual-chatbot/frontend

    Install dependencies:

npm install

Run the development server:

    npm run dev

    The frontend will be available at http://localhost:3000.

Backend

    Navigate to the backend folder:

cd ../backend

Set up your environment variables:
Create a .env file and add your required variables (e.g., API keys, if needed).

Install dependencies:

pip install -r requirements.txt

Run the FastAPI server:

    uvicorn main:app --reload

    The backend will be available at http://localhost:8000.

Usage

    Chatting:
    Type your message in the input box or use the microphone button to speak.
    The Send button or automatic submission (after speech recognition ends) sends your message to the backend, which responds accordingly.

    Voice Output:
    Click the speaker icon next to the assistant messages to hear the response using the browser’s TTS (speech synthesis).

    Language Selection:
    Choose your preferred language from the dropdown. The dropdown is fixed in width to keep the UI neat and becomes disabled after you send your first message.

Project Structure

/multilingual-chatbot
  ├── backend/                # FastAPI backend
  │   ├── main.py
  │   └── .env                # Environment variables (if needed)
  ├── frontend/               # Next.js/TypeScript frontend
  │   ├── components/
  │   │   ├── Chat.tsx        # Main chat component integrating display and input
  │   │   ├── ChatDisplay.tsx # Renders conversation messages
  │   │   └── ChatInput.tsx   # Handles input, speech recognition, and controls
  │   ├── types/
  │   │   └── index.ts        # All TypeScript interfaces (ChatProps, Message, etc.)
  │   └── package.json
  └── README.md

Troubleshooting

    Speech Recognition Errors:
    If you see "network" errors in the console, ensure your site is served over HTTPS, microphone permissions are granted, and you're using a supported browser (e.g., Chrome or Edge).

    Voice Output Issues:
    If the TTS output sounds unnatural, try adjusting the rate or verifying your browser’s default voice settings.

    Responsive Layout:
    The bottom row is designed to be responsive. If layout issues persist on small screens, inspect the Tailwind CSS classes and adjust the padding/margins as needed.

License

This project is licensed under the MIT License. See the LICENSE file for details.