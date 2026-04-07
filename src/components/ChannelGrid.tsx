"use client";
import React, { useRef, useCallback } from "react";
import { Channel } from "@/types";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import ChannelCard from "./ChannelCard";

interface ChannelGridProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  onSelect: (channel: Channel) => void;
  viewMode?: "grid" | "list";
}

export default function ChannelGrid({
  channels,
  selectedChannel,
  onSelect,
  viewMode = "grid",
}: ChannelGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useKeyboardNav(containerRef);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, channel: Channel) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(channel);
      }
    },
    [onSelect]
  );

  if (viewMode === "list") {
    return (
      <div ref={containerRef} className="flex flex-col gap-2">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors
              ${selectedChannel?.id === channel.id
                ? "bg-catholic-navy border-catholic-gold"
                : "bg-white/5 border-white/10 hover:border-catholic-gold/50"
              }`}
            role="button"
            tabIndex={0}
            aria-pressed={selectedChannel?.id === channel.id}
            onClick={() => onSelect(channel)}
            onKeyDown={(e) => handleKeyDown(e, channel)}
          >
            <span
              className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                channel.type === "radio"
                  ? "bg-purple-900/80 text-purple-300"
                  : "bg-red-900/80 text-red-300"
              }`}
            >
              {channel.type === "radio" ? "RADIO" : "LIVE"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{channel.name}</p>
              <p className="text-gray-400 text-xs truncate">{channel.description}</p>
            </div>
            {selectedChannel?.id === channel.id && (
              <span className="text-catholic-gold text-xs flex-shrink-0">▶ Playing</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      {channels.map((channel) => (
        <ChannelCard
          key={channel.id}
          channel={channel}
          isSelected={selectedChannel?.id === channel.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
