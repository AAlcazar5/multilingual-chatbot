// Chat.tsx
"use client";
import React, { useEffect, useState } from "react";
import { ChatProps, Message } from "../types/index";

const Chat: React.FC<ChatProps> = ({
  conversationId,
  messages,
  onSendMessage,
  onFirstUserMessage,
  language,
  onLanguageChange,
}) => {
  const [input, setInput] = useState("");

  // Clear the input when switching conversations.
  useEffect(() => {
    setInput("");
  }, [conversationId]);

  // Setup SpeechRecognition on mount.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const srWindow = window as Window & {
        SpeechRecognition?: typeof SpeechRecognition;
        webkitSpeechRecognition?: typeof SpeechRecognition;
      };
      srWindow.SpeechRecognition =
        srWindow.SpeechRecognition || srWindow.webkitSpeechRecognition;
    }
  }, []);

  const startListening = () => {
    const srWindow = window as Window & { SpeechRecognition?: typeof SpeechRecognition };
    if (!srWindow.SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }
    const recognition = new srWindow.SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    const langMapping: Record<string, string> = {
      English: "en-US",
      Spanish: "es-ES",
      Italian: "it-IT",
      French: "fr-FR",
      Portuguese: "pt-PT",
      German: "de-DE",
      Russian: "ru-RU",
      Mandarin: "zh-CN",
      Hindi: "hi-IN",
      Arabic: "ar-SA",
      Bengali: "bn-BD",
      Urdu: "ur-PK",
      Indonesian: "id-ID",
      Japanese: "ja-JP",
      Tagalog: "fil-PH",
    };
    recognition.lang = langMapping[language] || "en-US";
    let finalTranscript = "";
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("Speech recognition result event:", event);
      finalTranscript = event.results[0][0].transcript;
      console.log("Final transcript:", finalTranscript);
      setInput(finalTranscript);
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "network") {
        console.log("Network error encountered. Retrying in 1 second...");
        setTimeout(() => recognition.start(), 1000);
      }
    };
    recognition.onend = () => {
      console.log("Speech recognition ended. Transcript:", finalTranscript);
      if (finalTranscript.trim() !== "") {
        handleSubmit(finalTranscript);
      }
    };
    recognition.start();
  };

  const handleSubmit = async (transcript?: string) => {
    const messageContent = transcript !== undefined ? transcript : input.trim();
    if (!messageContent) return;
    const userMessage: Message = { role: "user", content: messageContent };
    if (messages.filter((msg) => msg.role === "user").length === 0 && onFirstUserMessage) {
      onFirstUserMessage(messageContent);
    }
    onSendMessage(userMessage);
    setInput("");
    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: messageContent, language }),
      });
      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.answer };
      onSendMessage(assistantMessage);
    } catch (error) {
      console.error("Error while fetching the answer:", error);
    }
  };

  // Use the browser's built-in speech synthesis for TTS with a rate of 0.9.
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const langMapping: Record<string, string> = {
      English: "en-US",
      Spanish: "es-ES",
      Italian: "it-IT",
      French: "fr-FR",
      Portuguese: "pt-PT",
      German: "de-DE",
      Russian: "ru-RU",
      Mandarin: "zh-CN",
      Hindi: "hi-IN",
      Arabic: "ar-SA",
      Bengali: "bn-BD",
      Urdu: "ur-PK",
      Indonesian: "id-ID",
      Japanese: "ja-JP",
      Tagalog: "fil-PH",
    };
    utterance.lang = langMapping[language] || "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isAssistant = msg.role === "assistant";
          return (
            <div key={index} className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
              <div className={`rounded p-3 max-w-[75%] ${isAssistant ? "bg-gray-700" : "bg-blue-600"}`}>
                <p>
                  {msg.content}
                  {isAssistant && (
                    <span
                      onClick={() => speakText(msg.content)}
                      className="ml-2 inline-block cursor-pointer hover:text-purple-400"
                    >
                      🔊
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2 sm:p-4 flex items-center bg-gray-900">
        <textarea
          rows={1}
          className="flex-1 p-2 text-black rounded focus:outline-none text-sm"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center space-x-2 ml-2">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            disabled={messages.some((msg) => msg.role === "user")}
            className="py-2 px-2 w-24 flex-none rounded text-black focus:outline-none text-sm"
          >
            <option value="English">English</option>
            <option value="Spanish">Español - Spanish</option>
            <option value="Italian">Italiano - Italian</option>
            <option value="French">Français - French</option>
            <option value="Portuguese">Português - Portuguese</option>
            <option value="German">Deutsch - German</option>
            <option value="Russian">Русский - Russian</option>
            <option value="Mandarin">中文 - Mandarin</option>
            <option value="Hindi">हिन्दी - Hindi</option>
            <option value="Arabic">العربية - Arabic</option>
            <option value="Bengali">বাংলা - Bengali</option>
            <option value="Urdu">اردو - Urdu</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Japanese">日本語 - Japanese</option>
            <option value="Tagalog">Tagalog</option>
          </select>
          <button
            onClick={startListening}
            className="px-2 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none text-sm"
          >
            🎤
          </button>
          <button
            onClick={() => handleSubmit()}
            className="px-2 sm:px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none text-sm ml-auto"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
