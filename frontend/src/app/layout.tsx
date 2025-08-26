import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chat Assistant - The AI Engineer Challenge",
  description: "A beautiful AI chat interface powered by OpenAI's GPT models",
  keywords: ["AI", "Chat", "OpenAI", "GPT", "Next.js", "FastAPI"],
  authors: [{ name: "AI Engineer Challenge" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
