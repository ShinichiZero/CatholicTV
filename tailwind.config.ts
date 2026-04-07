import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        catholic: {
          gold: "#C9A64A",
          navy: "#0A1628",
          crimson: "#8B0000",
          cream: "#F5F0E8",
        },
      },
      screens: {
        xs: "320px",
        "4k": "3840px",
      },
    },
  },
  plugins: [],
};
export default config;
