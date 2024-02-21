import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        discord: "#5368ee",
        dark: "#121212",
        "dark-lighter": "#171718",
        cta: "#000097",
      },
    },
  },
  plugins: [],
} satisfies Config;
