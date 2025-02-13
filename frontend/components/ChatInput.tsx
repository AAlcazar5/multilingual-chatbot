// ChatInput.tsx
"use client";
import React from "react";
import { ChatInputProps } from "../types/index";

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  onStartListening,
  language,
  onLanguageChange,
  messagesExist,
}: ChatInputProps) {
  return (
    <div className="w-full p-2 sm:p-4 flex items-center bg-gray-900">
      <textarea
        rows={1}
        className="flex-1 p-2 text-black rounded focus:outline-none text-sm"
        placeholder="Type your question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          disabled={messagesExist}
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
          onClick={onStartListening}
          className="px-2 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none text-sm"
        >
          🎤
        </button>
        <button
          onClick={() => onSubmit(input)}
          className="px-2 sm:px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none text-sm ml-auto"
        >
          Send
        </button>
      </div>
    </div>
  );
}
