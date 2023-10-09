import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontSize: {
        h1: "1.25rem",
        h2: "1.125rem",
        h3: "1rem",
        h4: "0.875rem",
        p: "1rem",
      },
      lineHeight: {
        h1: "1.75rem",
        h2: "1.75rem",
        h3: "1.5rem",
        h4: "1.25rem",
        p: "1.5rem",
      },
      height: {
        "120": "38rem",
      },
    },
  },
  plugins: [],
};
export default config;
