"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Channel } from "@/types";

interface ChannelCardProps {
  channel: Channel;
  isSelected: boolean;
  onSelect: (channel: Channel) => void;
}

export default function ChannelCard({ channel, isSelected, onSelect }: ChannelCardProps) {
  const [logoError, setLogoError] = useState(false);
  const handleClick = useCallback(() => onSelect(channel), [channel, onSelect]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(channel);
      }
    },
    [channel, onSelect]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Watch ${channel.name} - ${channel.description}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer
        transition-all duration-200 select-none
        border-2 min-h-[120px]
        ${
          isSelected
            ? "border-catholic-gold bg-catholic-navy shadow-lg shadow-catholic-gold/30 scale-105"
            : "border-white/10 bg-white/5 hover:border-catholic-gold/50 hover:bg-white/10"
        }
        focus:outline-none focus:ring-2 focus:ring-catholic-gold focus:ring-offset-2 focus:ring-offset-transparent
        focus-visible:ring-2 focus-visible:ring-catholic-gold
      `}
    >
      <div className="relative w-16 h-10 mb-2 flex-shrink-0 flex items-center justify-center">
        {logoError ? (
          <span className="text-2xl" aria-hidden="true">
            {channel.type === "radio" ? "📻" : "📺"}
          </span>
        ) : (
          <Image
            src={channel.logo}
            alt={`${channel.name} logo`}
            fill
            className="object-contain"
            loading="lazy"
            onError={() => setLogoError(true)}
          />
        )}
      </div>
      <span className="text-white font-semibold text-sm text-center leading-tight">
        {channel.name}
      </span>
      <span className="text-gray-400 text-xs text-center mt-1 line-clamp-2">
        {channel.description}
      </span>
      <span
        className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
          channel.type === "radio"
            ? "bg-purple-900/80 text-purple-300"
            : "bg-red-900/80 text-red-300"
        }`}
      >
        {channel.type === "radio" ? "RADIO" : "LIVE"}
      </span>
    </div>
  );
}
