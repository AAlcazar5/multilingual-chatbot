// Sidebar.tsx
"use client";
import React from "react";
import { ChatSidebarProps } from "../types";

const Sidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  onNewConversation,
  onDeleteConversation,
  onSelectConversation,
  activeConversation,
  onClose,
}) => {
  const truncateTitle = (title: string, wordLimit: number = 6): string => {
    const words = title.split(" ");
    if (words.length <= wordLimit) return title;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <aside className="w-full md:w-64 p-4 bg-gray-800 shadow-md relative text-white">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold text-white hover:text-red-400"
          aria-label="Close sidebar"
        >
          &times;
        </button>
      )}
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>
      <button
        onClick={onNewConversation}
        className="w-full p-2 bg-green-600 text-white rounded-lg mb-2 hover:bg-green-700"
      >
        New Conversation
      </button>
      <ul className="mt-4 space-y-3">
        {conversations.length === 0 ? (
          <li className="text-gray-400">No conversations yet.</li>
        ) : (
          conversations.map((conv) => (
            <li key={conv.id} className="flex items-center justify-between">
              <div
                onClick={() => onSelectConversation(conv.id)}
                className={`flex-1 p-2 rounded-lg cursor-pointer ${
                  conv.id === activeConversation
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                title={conv.title}
              >
                {truncateTitle(conv.title)}
              </div>
              <button
                onClick={() => onDeleteConversation(conv.id)}
                className="ml-2 text-xl text-gray-400 hover:text-red-500"
                aria-label="Delete conversation"
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
