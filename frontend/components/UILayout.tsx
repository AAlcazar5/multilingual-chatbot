// UILayout.tsx
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { Conversation, Message } from "../types";

export default function UILayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  // Memoize the translations object so that it doesn't change on every render.
  const translations = useMemo(
    () => ({
      English:
        "Hello, I'm a multilingual chatbot. Start the conversation in the language of your choice!",
      Spanish:
        "Hola, soy un chatbot multilingüe. ¡Comienza la conversación en el idioma de tu elección!",
      Italian:
        "Ciao, sono un chatbot multilingüe. Inizia la conversazione nella lingua che preferisci!",
      French:
        "Bonjour, je suis un chatbot multilingüe. Commencez la conversation dans la langue de votre choix!",
      Portuguese:
        "Olá, eu sou un chatbot multilíngue. Comece a conversa no idioma de sua escolha!",
      German:
        "Hallo, ich bin ein mehrsprachiger Chatbot. Beginnen Sie das Gespräch in der Sprache Ihrer Wahl!",
      Russian:
        "Привет, я многоязычный чат-бот. Начните разговор на языке по вашему выбору!",
      Mandarin:
        "你好, 我是一个多语言聊天机器人。请用您选择的语言开始对话！",
      Hindi:
        "नमस्ते, मैं एक बहुभाषी चैटबोट हूँ। अपनी पसंद की भाषा में बातचीत शुरू करें!",
      Arabic:
        "مرحبًا, أنا روبوت دردشة متعدد اللغات. ابدأ المحادثة باللغة التي تختارها!",
      Bengali:
        "হ্যালো, আমি একটি বহুভাষিক চ্যাটবট। আপনার পছন্দের ভাষায় আলাপ শুরু করুন!",
      Urdu:
        "ہیلو, میں ایک کثیر لسانی چیٹ بوٹ ہوں۔ اپنی پسند کی زبان میں بات چیت شروع کریں!",
      Indonesian:
        "Halo, saya adalah chatbot multibahasa. Mulailah percakapan dalam bahasa pilihan Anda!",
      Japanese:
        "こんにちは, 私は多言語対応のチャットボットです。お好きな言語で会話を始めてください！",
      Tagalog:
        "Kamusta! Ako'y isang chatbot na marunong ng maraming wika. Simulan na natin ang usapan sa wikang gusto mo!",
    }),
    []
  );

  // Wrap getInitialMessage in useCallback so its reference remains stable.
  const getInitialMessage = useCallback((lang: string): string => {
    return translations[lang as keyof typeof translations] || translations["English"];
  }, [translations]);
  

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      title: "New Conversation",
      messages: [{ role: "assistant", content: getInitialMessage(language) }],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(1);
  const [nextConversationId, setNextConversationId] = useState(2);

  useEffect(() => {
    if (activeConversationId !== null) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId &&
          conv.title === "New Conversation" &&
          conv.messages.length === 1
            ? { ...conv, messages: [{ role: "assistant", content: getInitialMessage(language) }] }
            : conv
        )
      );
    }
  }, [language, activeConversationId, getInitialMessage]);

  const generateTitleFromMessage = (message: string): string => {
    const words = message.trim().split(" ");
    return words.length <= 5 ? message : words.slice(0, 5).join(" ") + "...";
  };

  const onFirstUserMessage = (message: string) => {
    if (activeConversationId !== null) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId && conv.title === "New Conversation"
            ? { ...conv, title: generateTitleFromMessage(message) }
            : conv
        )
      );
    }
  };

  const handleNewConversation = (): void => {
    const newConv: Conversation = {
      id: nextConversationId,
      title: "New Conversation",
      messages: [{ role: "assistant", content: getInitialMessage(language) }],
    };
    setConversations((prev) => [...prev, newConv]);
    setActiveConversationId(nextConversationId);
    setNextConversationId((prev) => prev + 1);
  };

  const handleDeleteConversation = (id: number): void => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const handleSelectConversation = (id: number): void => {
    setActiveConversationId(id);
  };

  const onSendMessage = (newMessage: Message) => {
    if (activeConversationId !== null) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      );
    }
  };

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId);
  const messages = activeConversation ? activeConversation.messages : [];

  return (
    <div className="flex h-screen m-0">
      <div className="hidden md:block w-64 bg-gray-800">
        <Sidebar
          onNewConversation={handleNewConversation}
          language={language}
          conversations={conversations}
          onDeleteConversation={handleDeleteConversation}
          onSelectConversation={handleSelectConversation}
          activeConversation={activeConversationId}
        />
      </div>
      <div className="flex flex-col flex-1 bg-gray-900" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <div className="relative flex items-center h-16 px-4 bg-gray-900 shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute left-4 top-1/2 transform -translate-y-1/2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h2 className="w-full text-center text-xl font-bold">
            Multilingual Chatbot
          </h2>
        </div>

        <div className="flex-1 overflow-hidden">
          <Chat
            key={activeConversationId ?? "new"}
            conversationId={activeConversationId}
            messages={messages}
            language={language}
            onLanguageChange={setLanguage}
            onFirstUserMessage={onFirstUserMessage}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onNewConversation={handleNewConversation}
          language={language}
          conversations={conversations}
          onDeleteConversation={handleDeleteConversation}
          onSelectConversation={handleSelectConversation}
          activeConversation={activeConversationId}
        />
      </div>
    </div>
  );
}
