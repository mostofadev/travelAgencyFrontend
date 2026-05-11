"use client";
// ============================================
// ChatWindow.jsx — Main Chat Container
// ============================================

import { useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import LeadForm from "./LeadForm";

export default function ChatWindow({
  onPackageSelect,
  onVisaSelect,
  hideHeader = false,
}) {
  const bottomRef = useRef(null);

  const {
    messages,
    isLoading,
    isLeadLoading,
    showLeadForm,
    setShowLeadForm,
    leadSubmitted,
    sendChatMessage,
    handleLeadSubmit,
    clearChat,
  } = useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showLeadForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.message;
    const text = input.value.trim();
    if (!text) return;
    sendChatMessage(text);
    input.value = "";
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* ── Header (only when not inside widget) ── */}
      {!hideHeader && (
        <div
          className="flex items-center justify-between px-4 py-3
                        bg-white border-b border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center
                            justify-center text-white shadow-md shadow-primary/30"
            >
              ✈️
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Travel Assistant
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-gray-400">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-[11px] text-gray-400 hover:text-red-400
                       transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
          >
            🗑️ Clear
          </button>
        </div>
      )}

      {/* ── Clear button when inside widget ── */}
      {hideHeader && (
        <div className="flex justify-end px-3 pt-2">
          <button
            onClick={clearChat}
            className="text-[10px] text-gray-400 hover:text-red-400
                       transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
          >
            🗑️ Clear chat
          </button>
        </div>
      )}

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3
                      scrollbar-thin scrollbar-thumb-gray-200"
      >
        {messages.filter(Boolean).map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onPackageSelect={onPackageSelect}
            onVisaSelect={onVisaSelect}
          />
        ))}

        {isLoading && <TypingIndicator />}

        {showLeadForm && !leadSubmitted && (
          <LeadForm
            onSubmit={handleLeadSubmit}
            onDismiss={() => setShowLeadForm(false)}
            isLoading={isLeadLoading}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Quick Replies ── */}
      <QuickReplies
        onSelect={sendChatMessage}
        visible={messages.length <= 1 && !isLoading}
      />

      {/* ── Input ── */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3
                   bg-white border-t border-gray-100"
      >
        <input
          name="message"
          type="text"
          placeholder="Message..."
          disabled={isLoading}
          className="flex-1 text-sm bg-gray-100 rounded-full px-4 py-2.5
                     outline-none focus:ring-2 focus:ring-primary/30
                     disabled:opacity-50 transition-all placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center
                     justify-center shadow-md shadow-primary/30 hover:bg-primary/90
                     active:scale-95 transition-all disabled:opacity-50 flex-shrink-0"
        >
          {isLoading ? (
            <span
              className="w-4 h-4 border-2 border-white/40 border-t-white
                             rounded-full animate-spin"
            />
          ) : (
            <svg
              className="w-4 h-4 translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12
                       3.269 3.269 0 0 1 3.27 20.875L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
