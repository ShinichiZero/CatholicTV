"use client";
import React from "react";

interface StreamErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function StreamError({
  message = "Stream Unavailable",
  onRetry,
}: StreamErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-black/90 text-white rounded-lg p-6 text-center">
      <div className="text-5xl mb-4" aria-hidden="true">📡</div>
      <h2 className="text-xl font-bold mb-2 text-catholic-gold">Stream Unavailable</h2>
      <p className="text-gray-300 mb-4 text-sm max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-catholic-gold text-black font-semibold rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-catholic-gold focus:ring-offset-2 focus:ring-offset-black transition-colors"
          tabIndex={0}
          aria-label="Retry stream"
        >
          Retry
        </button>
      )}
    </div>
  );
}
