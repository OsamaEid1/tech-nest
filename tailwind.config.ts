import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        layouts: "#000000",
        secBoxesColor: "#F0F0F5",
        hovers: "#00A9C3",
        light: "#E0E0E0",
        shadows: "#D6D6D6",
        secTextColor: "#333333",
        notes: "#FF9800",
      },
      borderRadius: {
        main: "0.75rem",
      },
      textOverflow: {
        unset: "unset"
      }
    },
  },
  plugins: [],
};
export default config;