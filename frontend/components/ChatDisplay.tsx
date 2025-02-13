// ChatDisplay.tsx
"use client";
import React from "react";
import { ChatDisplayProps } from "../types/index";

export default function ChatDisplay({ messages, onSpeak }: ChatDisplayProps) {
  return (
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
                    onClick={() => onSpeak(msg.content)}
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
  );
}
