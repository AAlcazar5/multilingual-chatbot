// app/layout.tsx
import "../globals.css";
import type { Metadata } from "next";
import React from "react";

// Optionally define metadata (for SEO, etc.)
export const metadata: Metadata = {
  title: "MultiLingual Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
