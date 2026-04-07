"use client";
import React, { useEffect, useState } from "react";
import { Recording } from "@/types";
import { useStore } from "@/store/useStore";

export default function DVRPage() {
  const { recordings } = useStore();
  const [apiRecordings, setApiRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dvr/recordings")
      .then((r) => r.json())
      .then((data) => {
        setApiRecordings(data.recordings || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recordings");
        setLoading(false);
      });
  }, []);

  const allRecordings = [...recordings, ...apiRecordings];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Cloud DVR</h1>
        <p className="text-gray-400 text-sm">Record and replay your favorite Catholic programs.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-catholic-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">⚠️ {error}</p>
          <p className="text-sm">DVR service may not be configured yet.</p>
        </div>
      ) : allRecordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-xl border border-white/10 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">⏺</div>
          <h2 className="text-xl font-semibold text-white mb-2">No recordings yet</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Use the API endpoint{" "}
            <code className="text-catholic-gold">/api/dvr/record</code> to start recording a stream.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {allRecordings.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-catholic-gold/30 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  rec.status === "recording"
                    ? "bg-red-400 animate-pulse"
                    : rec.status === "completed"
                    ? "bg-green-400"
                    : "bg-gray-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{rec.channelName}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {new Date(rec.startTime).toLocaleString()} · {Math.round(rec.duration / 60)}m
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  rec.status === "recording"
                    ? "bg-red-900/60 text-red-300"
                    : rec.status === "completed"
                    ? "bg-green-900/60 text-green-300"
                    : "bg-gray-900/60 text-gray-400"
                }`}
              >
                {rec.status.toUpperCase()}
              </span>
              {rec.url && rec.status === "completed" && (
                <a
                  href={rec.url}
                  className="text-catholic-gold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-catholic-gold rounded px-2 py-1"
                  aria-label={`Play ${rec.channelName} recording`}
                  rel="noopener noreferrer"
                >
                  ▶ Play
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
