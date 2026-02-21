// components/ui/NetworkOfflineModal.jsx
"use client";

import { WifiOff } from "lucide-react";

export default function NetworkOfflineModal({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <WifiOff size={32} />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          No Internet Connection
        </h2>

        <p className="text-gray-600 mt-2">
          Your network connection is offline.
          <br />
          Please check your internet and try again.
        </p>

        <p className="mt-4 text-sm text-gray-400">
          This page will automatically reconnect once the internet is back.
        </p>
      </div>
    </div>
  );
}
