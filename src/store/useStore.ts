import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState, Channel, Recording } from "@/types";

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      audioOnly: false,
      selectedChannel: null,
      recordings: [],
      viewMode: "grid",
      setAudioOnly: (val: boolean) => set({ audioOnly: val }),
      setSelectedChannel: (channel: Channel | null) => set({ selectedChannel: channel }),
      addRecording: (rec: Recording) =>
        set((state) => ({ recordings: [rec, ...state.recordings] })),
      setViewMode: (mode: "grid" | "list") => set({ viewMode: mode }),
    }),
    { name: "catholictv-storage" }
  )
);
