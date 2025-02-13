"use client";
import { useEffect, useState } from "react";
import { ChatProps, Message } from "../types/index";
import ChatDisplay from "./ChatDisplay";
import ChatInput from "./ChatInput";

export default function Chat({
  conversationId,
  messages,
  onSendMessage,
  onFirstUserMessage,
  language,
  onLanguageChange,
}: ChatProps) {
  const [input, setInput] = useState("");

  // Clear input when conversation changes.
  useEffect(() => {
    setInput("");
  }, [conversationId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const srWindow = window as Window & {
        SpeechRecognition?: any;
        webkitSpeechRecognition?: any;
      };
      srWindow.SpeechRecognition =
        srWindow.SpeechRecognition || srWindow.webkitSpeechRecognition;
    }
  }, []);

  const startListening = () => {
    const srWindow = window as Window & { SpeechRecognition?: any };
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
    recognition.onresult = (event: any) => {
      console.log("Speech recognition result event:", event);
      finalTranscript = event.results[0][0].transcript;
      console.log("Final transcript:", finalTranscript);
      setInput(finalTranscript);
    };
    recognition.onerror = (event: any) => {
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
    if (
      messages.filter((msg) => msg.role === "user").length === 0 &&
      onFirstUserMessage
    ) {
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
      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      };
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
      <ChatDisplay messages={messages} language={language} onSpeak={speakText} />
      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        onStartListening={startListening}
        language={language}
        onLanguageChange={onLanguageChange}
        messagesExist={messages.some((msg) => msg.role === "user")}
      />
    </div>
  );
}
