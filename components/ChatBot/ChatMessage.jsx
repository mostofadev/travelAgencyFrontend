"use client";
// ============================================
// ChatMessage.jsx — Single Message Bubble
// ============================================

import PackageCard from "./PackageCard";
import VisaCard from "./VisaCard";
import ItineraryView from "./ItineraryView";
import { formatTime } from "@/lib/helpers";

export default function ChatMessage({
  message,
  onPackageSelect,
  onVisaSelect,
}) {
  const isBot = message.role === "assistant";

  const hasPackages = message.packages?.length > 0;
  const hasVisas = message.visas?.length > 0;
  const hasItinerary = message.itinerary?.length > 0;

  return (
    <div className={`flex gap-2 ${isBot ? "justify-start" : "justify-end"}`}>
      {/* Bot Avatar */}
      {isBot && (
        <div
          className="w-7 h-7 rounded-full bg-primary flex items-center
                        justify-center text-white text-sm flex-shrink-0 mt-1
                        shadow-md shadow-primary/30"
        >
          ✈️
        </div>
      )}

      <div
        className={`flex flex-col gap-2 max-w-[85%]
                       ${isBot ? "items-start" : "items-end"}`}
      >
        {/* Message Bubble */}
        <div
          className={`
          px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
          ${
            isBot
              ? "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              : "bg-primary text-white rounded-tr-none shadow-primary/20"
          }
        `}
        >
          {/* Text content — newline handle */}
          {message.content.split("\n").map((line, i) => {
            // Bullet points সুন্দর করি
            if (line.startsWith("• ")) {
              return (
                <div key={i} className="flex items-start gap-1.5 mt-0.5">
                  <span
                    className={`mt-1 w-1 h-1 rounded-full flex-shrink-0
                                   ${isBot ? "bg-primary" : "bg-white/70"}`}
                  />
                  <span>{line.slice(2)}</span>
                </div>
              );
            }
            // Bold text — **text**
            if (line.includes("**")) {
              const parts = line.split("**");
              return (
                <p key={i} className={i > 0 ? "mt-1" : ""}>
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j}>{part}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    ),
                  )}
                </p>
              );
            }
            // Empty line → spacing
            if (!line.trim()) {
              return <div key={i} className="h-1" />;
            }
            return (
              <p key={i} className={i > 0 ? "mt-0.5" : ""}>
                {line}
              </p>
            );
          })}
        </div>

        {/* Package Cards */}
        {/* {hasPackages && (
          <div className="w-full">
            <p className="text-[10px] text-gray-400 mb-1.5 ml-1">
              🌍 {message.packages.length}টি Package পেলাম:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {message.packages.map((pkg, i) => (
                <PackageCard key={i} pkg={pkg} onSelect={onPackageSelect} />
              ))}
            </div>
          </div>
        )} */}

        {/* Visa Cards */}
        {/* {hasVisas && (
          <div className="w-full space-y-2">
            <p className="text-[10px] text-gray-400 ml-1">
              🛂 {message.visas.length}টি Visa পেলাম:
            </p>
            {message.visas.map((visa, i) => (
              <VisaCard key={i} visa={visa} onSelect={onVisaSelect} />
            ))}
          </div>
        )} */}

        {/* Itinerary */}
        {/* {hasItinerary && (
          <div className="w-full">
            <ItineraryView itinerary={message.itinerary} />
          </div>
        )} */}

        {/* Timestamp */}
        <p
          className={`text-[9px] text-gray-300 px-1
                       ${isBot ? "self-start" : "self-end"}`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>

      {/* User Avatar */}
      {!isBot && (
        <div
          className="w-7 h-7 rounded-full bg-gray-200 flex items-center
                        justify-center text-sm flex-shrink-0 mt-1"
        >
          👤
        </div>
      )}
    </div>
  );
}
