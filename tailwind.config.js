/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eci: {
          saffron: "#FF9933",
          navy: "#000080",
          green: "#138808",
          gold: "#D4AF37",
          darkNavy: "#0B132B",
          slate: "#1C2541",
          cardBg: "#1E293B",
          accentBlue: "#38BDF8"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}
