import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        prime_100: "#F2F2F2",
        prime_300: "#A6A6A6",
        prime_500: "#595959",
        prime_700: "#262626",
        prime_800: "#141414",
        prime_900: "#0D0D0D",
      },
    },
    boxShadow: {
      border_1: "0 0 0 2px hsla(0,0%,100%,.14)",
    },
  },
  plugins: [],
};
export default config;
