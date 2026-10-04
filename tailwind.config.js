/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ec5b53", // Astra Personal Portfolio 02 Coral Red
          hover: "#cf332b",
          light: "rgba(236, 91, 83, 0.08)",
        },
        navy: {
          DEFAULT: "#002d5b", // Astra Deep Navy Accent
          dark: "#001b38",
        },
        charcoal: {
          DEFAULT: "#35373a",
          dark: "#1e2022",
        },
        warm: {
          white: "#fefafa",
          card: "#ffffff",
          muted: "#f4f6f8",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
