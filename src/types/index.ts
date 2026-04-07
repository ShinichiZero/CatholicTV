export interface Channel {
  id: string;
  name: string;
  type: "tv" | "radio";
  url: string;
  logo: string;
  description: string;
  category?: string;
}

export interface Recording {
  id: string;
  channelId: string;
  channelName: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: "recording" | "completed" | "failed";
  url?: string;
}

export interface AppState {
  audioOnly: boolean;
  selectedChannel: Channel | null;
  recordings: Recording[];
  viewMode: "grid" | "list";
  setAudioOnly: (val: boolean) => void;
  setSelectedChannel: (channel: Channel | null) => void;
  addRecording: (rec: Recording) => void;
  setViewMode: (mode: "grid" | "list") => void;
}
