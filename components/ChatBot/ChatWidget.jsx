"use client";
// ============================================
// ChatWidget.jsx — Floating Chat Widget
// ============================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handlePackageSelect = (pkg) => {
    router.push(`/packages/${pkg.id}`);
  };

  const handleVisaSelect = (visa) => {
    router.push(`/visa/${visa.id}`);
  };

  return (
    <>
      {/* ── Chat Window ── */}
      <div
        className={`
          fixed bottom-20 right-4 z-50
          w-[370px] max-w-[calc(100vw-2rem)]
          h-[600px] max-h-[calc(100vh-6rem)]
          bg-white rounded-3xl shadow-2xl shadow-black/20
          border border-gray-100
          flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out origin-bottom-right
          ${
            isOpen
              ? "scale-100 opacity-100 pointer-events-auto"
              : "scale-75 opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3
                        bg-white border-b border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center
                            justify-center text-white shadow-md shadow-primary/30"
            >
              <MessageCircle size={18} fill="white" />
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
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-50
                       hover:text-red-400 text-gray-400 flex items-center
                       justify-center transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Chat Content */}
        <ChatWindow
          onPackageSelect={handlePackageSelect}
          onVisaSelect={handleVisaSelect}
          hideHeader
        />
      </div>

      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full
                   bg-primary text-white flex items-center justify-center
                   shadow-xl shadow-primary/40 hover:scale-110 active:scale-95
                   transition-all duration-300"
      >
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full bg-primary
                           animate-ping opacity-30"
          />
        )}

        <MessageCircle
          size={26}
          fill="white"
          className={`transition-all duration-300 absolute
                      ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        />
        <X
          size={22}
          className={`transition-all duration-300 absolute
                      ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        />
      </button>
    </>
  );
}
