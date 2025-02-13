export interface Message {
  role: "assistant" | "user";
  content: string;
}

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

// Used by the Chat component.
export interface ChatProps {
  conversationId: number | null;
  messages: Message[];
  onSendMessage: (newMessage: Message) => void;
  onFirstUserMessage?: (message: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export interface ChatSidebarProps {
  conversations: Conversation[];
  onNewConversation: () => void;
  onDeleteConversation: (id: number) => void;
  onSelectConversation: (id: number) => void;
  activeConversation: number | null;
  language: string;
  onClose?: () => void;
}

// Used by the ChatDisplay component.
export interface ChatDisplayProps {
  messages: Message[];
  language: string;
  onSpeak: (text: string) => void;
}

// Used by the ChatInput component.
export interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (text: string) => void;
  onStartListening: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  messagesExist: boolean;
}
