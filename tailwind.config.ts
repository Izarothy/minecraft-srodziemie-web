import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        discord: "#7389db",
        dark: "#0f0f0e",
        cta: "#000097",
      },
    },
  },
  plugins: [],
} satisfies Config;
