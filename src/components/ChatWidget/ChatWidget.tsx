"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { X, Send, Phone, Loader2 } from "lucide-react";
import Image from "next/image";
import { useChat } from "ai/react";
import { type Message } from "ai";
import { useModalDismiss } from "@/lib/useModalDismiss";

const quickQuestions = [
  "What plans do you offer?",
  "Is it safe for my pets?",
  "Do you offer organic treatments?",
  "How soon can you come?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Vercel AI SDK hook manages state, streaming, and API calling automatically
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "sys-1",
        role: "assistant",
        content: "Hi! I'm Squito AI, your pest control assistant. How can I help you today? Ask me about our services, pricing, safety, or anything pest-related!"
      }
    ],
    onError: (error: any) => {
      console.error("Chat Error:", error);
      append({
        role: "assistant",
        content: "Oops! My OpenAI service connection failed. Please ensure the OPENAI_API_KEY is correctly set in `.env.local` and that your OpenAI API dashboard has an active billing plan (Quota Exceeded is common)!"
      });
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const closeChat = useCallback(() => setOpen(false), []);
  useModalDismiss(open, closeChat, chatInputRef);

  const sendQuickQuestion = (q: string) => {
    append({
      role: "user",
      content: q
    });
  };

  return (
    <>
      <button
        type="button"
        className={`fixed right-6 z-[9900] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.4)] ${open ? 'bg-card hover:bg-card border border-border scale-90' : 'bg-primary hover:scale-110'}`}
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Chat with Squito AI"}
        aria-expanded={open}
        aria-controls="squito-chat-panel"
      >
        {open ? (
          <X size={24} className="text-foreground/70" />
        ) : (
          // Inner wrapper holds the `overflow-hidden` so the avatar image
          // stays clipped to the circle, while the outer button DOES NOT
          // clip — that lets the red "new message" dot sit proud of the
          // circle instead of getting sliced off at the corners.
          <span className="w-full h-full rounded-full overflow-hidden block">
            <Image
              src="/chat-avatar.png"
              alt=""
              width={112}
              height={112}
              priority
              className="w-full h-full object-cover"
            />
          </span>
        )}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-background rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"
          />
        )}
      </button>

      {open && (
        <div
          id="squito-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Squito AI chat"
          className="fixed right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[550px] max-h-[calc(100dvh-120px)] bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl z-[9900] flex flex-col overflow-hidden animate-fade-in-up"
          style={{ bottom: "calc(6rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="bg-card border-b border-border p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                  <Image
                    src="/chat-avatar.png"
                    alt="Squito AI"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Online pip sits outside the avatar circle — kept here as a
                    sibling, not a child, so it never gets clipped. */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card"
                />
              </div>
              <div>
                <div className="font-display font-bold text-foreground leading-none mb-1 flex items-center gap-1">
                  Squito <span className="text-primary">AI</span>
                </div>
                <div className="text-xs text-green-600 font-semibold uppercase tracking-wider">Online</div>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="tel:6312031000" aria-label="Call Squito Pest Control" className="w-8 h-8 rounded-full bg-tint-5 hover:bg-tint-10 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors">
                <Phone size={14} />
              </a>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-full bg-tint-5 hover:bg-tint-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scroll-smooth">
            {messages.map((msg: Message, idx: number) => {
              // Only surface "Contact Us" on the latest assistant reply AFTER the
              // user has actually asked something — the intro message alone does
              // not earn a CTA.
              const hasUserSpoken = messages.some((m) => m.role === "user");
              const isLatestAssistant =
                msg.role === "assistant" && idx === messages.length - 1 && !isLoading;
              const showContactCta = isLatestAssistant && hasUserSpoken;
              return (
                <div key={msg.id} className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-md whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-card border border-border text-foreground/90 rounded-bl-sm'}`}>
                    {msg.content}
                  </div>
                  {showContactCta && (
                    <a href="/contact" className="inline-flex items-center justify-center px-4 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-600 text-[11px] uppercase tracking-wider font-bold rounded-full transition-all">
                      Contact Us
                    </a>
                  )}
                </div>
              );
            })}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="self-start max-w-[85%] bg-card border border-border text-foreground/90 p-4 rounded-2xl rounded-bl-sm flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 3 && !isLoading && (
            <div className="px-4 pb-2 shrink-0 flex gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendQuickQuestion(q)}
                  className="inline-block px-3 py-1.5 bg-tint-5 hover:bg-green-500/10 border border-border hover:border-green-500/30 text-xs text-foreground/70 hover:text-primary rounded-full transition-colors flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 bg-card border-t border-border shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="relative flex items-center"
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your question for Squito AI
              </label>
              <input
                ref={chatInputRef}
                type="text"
                placeholder="Ask about pests, plans, pricing..."
                value={input}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-green-500/50 rounded-full pl-4 pr-12 py-3 text-sm text-foreground placeholder:text-subtle outline-none transition-colors"
                id="chat-input"
                autoComplete="off"
              />
              <button
                onClick={(e) => {
                  if (!input.trim()) e.preventDefault();
                }}
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-1 w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground bg-primary hover:bg-green-400 disabled:bg-tint-10 disabled:text-subtle transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-primary-foreground/70" /> : <Send size={16} className="-ml-0.5 mt-0.5" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
