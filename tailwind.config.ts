import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Column colors
    "bg-red-50",
    "bg-amber-50", 
    "bg-emerald-50",
    "border-red-200",
    "border-amber-200",
    "border-emerald-200",
    "text-red-700",
    "text-amber-700",
    "text-emerald-700",
    // Badge colors
    "bg-red-100",
    "bg-amber-100",
    "bg-emerald-100",
    "text-red-800",
    "text-amber-800",
    "text-emerald-800",
    // Priority colors
    "border-emerald-300",
    "border-amber-300",
    "border-red-300",
    // Points colors
    "bg-blue-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-pink-100",
    "text-blue-800",
    "text-indigo-800",
    "text-purple-800",
    "text-pink-800",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
