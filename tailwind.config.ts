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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--theme-primary, #1e3a8a)",
        secondary: "var(--theme-secondary, #facc15)",
        heading: "var(--theme-heading, #111827)",
        text: "var(--theme-text, #4b5563)",
      },
    },
  },
  plugins: [],
};
export default config;
