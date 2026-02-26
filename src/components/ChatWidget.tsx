"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { useLocale } from "next-intl";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CONTACT = {
  email: "carrie.lan998@gmail.com",
  phone: "+1 (415) 851-1937",
};

const GREETING_TEXT: Record<string, string> = {
  en: "Hi! I'm your MedTravel China assistant. Ask me anything about our dental packages, pricing, or the Guangxi experience. 😊",
  zh: "您好！我是中国医旅的智能助手。欢迎咨询牙科套餐、价格或广西旅游相关问题 😊",
};

const PLACEHOLDERS: Record<string, string> = {
  en: "Ask a question...",
  zh: "请输入您的问题...",
};

const CONTACT_LABELS: Record<string, { title: string; note: string }> = {
  en: {
    title: "Talk to Carrie Lan",
    note: "Usually replies within a few hours.",
  },
  zh: { title: "联系协调员 Carrie Lan", note: "通常在数小时内回复。" },
};

const AI_LABEL: Record<string, string> = {
  en: "AI Support",
  zh: "AI 智能客服",
};

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}

function makeGreeting(locale: string): UIMessage {
  const text = GREETING_TEXT[locale] ?? GREETING_TEXT.en;
  return {
    id: "greeting",
    role: "assistant",
    parts: [{ type: "text", text }],
    metadata: undefined,
  };
}

export function ChatWidget() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    messages: [makeGreeting(locale)],
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  }

  const contact = CONTACT_LABELS[locale] ?? CONTACT_LABELS.en;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🦷
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">
                MedTravel China
              </p>
              <p className="text-emerald-100 text-xs">
                {AI_LABEL[locale] ?? AI_LABEL.en}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 bg-gray-50">
            {messages.map((m) => {
              const text = getMessageText(m);
              if (!text) return null;
              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 mb-2 last:mb-0">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 mb-2 last:mb-0">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1 last:mb-0">{children}</li>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="underline text-emerald-700"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {text}
                      </ReactMarkdown>
                    ) : (
                      text
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3 py-2">
                  <span className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Human contact strip */}
          <div className="border-t border-gray-100 bg-emerald-50 px-4 py-2">
            <p className="text-xs font-medium text-emerald-800 mb-1">
              {contact.title}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-emerald-700">
              <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/[\s()]/g, "")}`}
                className="hover:underline"
              >
                {CONTACT.phone}
              </a>
            </div>
            <p className="text-xs text-emerald-600 mt-0.5">{contact.note}</p>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white px-3 py-2 flex gap-2 items-end">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={PLACEHOLDERS[locale] ?? PLACEHOLDERS.en}
              className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 max-h-24"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors"
            >
              <svg
                className="w-4 h-4 rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
