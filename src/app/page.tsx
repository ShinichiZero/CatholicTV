"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CHANNELS } from "@/data/channels";
import { Channel } from "@/types";
import { useStore } from "@/store/useStore";
import ChannelGrid from "@/components/ChannelGrid";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), { ssr: false });

export default function HomePage() {
  const { audioOnly, setAudioOnly, viewMode, setViewMode, selectedChannel, setSelectedChannel } =
    useStore();
  const [filter, setFilter] = useState<"all" | "tv" | "radio">("all");

  const filteredChannels =
    filter === "all" ? CHANNELS : CHANNELS.filter((c) => c.type === filter);

  const handleSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    if (window.innerWidth < 768) {
      document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const channelId = new URLSearchParams(window.location.search).get("channel");
    if (!channelId || selectedChannel) return;
    const channel = CHANNELS.find((c) => c.id === channelId);
    if (channel) setSelectedChannel(channel);
  }, [selectedChannel, setSelectedChannel]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-3.5rem-3rem)]">
      {/* Sidebar - Channel List */}
      <aside className="lg:w-[580px] flex-shrink-0 flex flex-col gap-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter buttons */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-lg" role="group" aria-label="Filter channels">
            {(["all", "tv", "radio"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded text-sm font-medium capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-catholic-gold
                  ${filter === f ? "bg-catholic-gold text-black" : "text-gray-400 hover:text-white"}`}
                aria-pressed={filter === f}
              >
                {f === "all" ? "All" : f === "tv" ? "📺 TV" : "📻 Radio"}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-lg ml-auto" role="group" aria-label="View mode">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-catholic-gold
                ${viewMode === "grid" ? "bg-catholic-gold text-black" : "text-gray-400 hover:text-white"}`}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-catholic-gold
                ${viewMode === "list" ? "bg-catholic-gold text-black" : "text-gray-400 hover:text-white"}`}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              ☰
            </button>
          </div>

          {/* Audio only toggle */}
          <label className="flex items-center gap-2 cursor-pointer ml-2">
            <span className="text-gray-400 text-sm">Audio Only</span>
            <div
              role="switch"
              aria-checked={audioOnly}
              aria-label="Toggle audio only mode"
              tabIndex={0}
              onClick={() => setAudioOnly(!audioOnly)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setAudioOnly(!audioOnly);
                }
              }}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-catholic-gold
                ${audioOnly ? "bg-catholic-gold" : "bg-white/20"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform
                  ${audioOnly ? "translate-x-5" : "translate-x-0"}`}
              />
            </div>
          </label>
        </div>

        {/* Channel count */}
        <p className="text-gray-400 text-xs">{filteredChannels.length} channels available</p>

        {/* Channel Grid */}
        <div className="overflow-auto">
          <ChannelGrid
            channels={filteredChannels}
            selectedChannel={selectedChannel}
            onSelect={handleSelect}
            viewMode={viewMode}
          />
        </div>
      </aside>

      {/* Main Player Area */}
      <div id="player-section" className="flex-1 flex flex-col gap-4">
        {selectedChannel ? (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-white">
                {selectedChannel.name}
              </h1>
              <span className="text-gray-400 text-sm">{selectedChannel.description}</span>
              <span className="ml-auto flex items-center gap-1 text-red-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <VideoPlayer channel={selectedChannel} audioOnly={audioOnly} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[300px] bg-white/5 rounded-xl border border-white/10 text-center p-8">
            <div className="text-6xl mb-4" aria-hidden="true">✝</div>
            <h2 className="text-2xl font-bold text-catholic-gold mb-2">
              Welcome to CatholicTV
            </h2>
            <p className="text-gray-400 max-w-sm">
              Select a channel from the list to start watching live Catholic TV and radio streams.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
