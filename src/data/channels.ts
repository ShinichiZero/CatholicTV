import { Channel } from "@/types";

export const CHANNELS: Channel[] = [
  { 
    id: "tv2000", 
    name: "TV2000", 
    type: "tv",
    url: "https://hls-live-tv2000.akamaized.net/hls/live/2028510/tv2000/master.m3u8",
    logo: "/logos/tv2000.png", 
    description: "Italian Catholic Television" 
  },
  { 
    id: "telepace", 
    name: "Telepace", 
    type: "tv",
    // Note: The Dailymotion link you found is session-based. 
    // Using the MariaTV CDN link is safer for permanent implementation.
    url: "https://live.mariatvcdn.com/mariatvpoint/d36592901d5429dd7f9ec1e7bbeda8c2.sdp/index.m3u8",
    logo: "/logos/telepace.png", 
    description: "Catholic TV Network" 
  },
  { 
    id: "catholictv", 
    name: "CatholicTV", 
    type: "tv",
    url: "https://catholictvhd-lh.akamaized.net/hls/live/2043390/CTVLiveHD/master.m3u8",
    logo: "/logos/catholictv.png", 
    description: "CatholicTV Network" 
  },
  { 
    id: "vaticannews", 
    name: "Vatican Media", 
    type: "tv",
    url: "https://smvlive.vaticannews.va/hls/smvlive/master.m3u8",
    logo: "/logos/vaticannews.png", 
    description: "Official Vatican Broadcasting" 
  },
  { 
    id: "radiomaria", 
    name: "Radio Maria", 
    type: "radio",
    url: "https://shoutcast.radiomaria.it:8443/stream",
    logo: "/logos/radiomaria.png", 
    description: "Radio Maria - Live Radio" 
  }
];
