/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      fondo: "#0d2235",
      boton: "#33c3f0",
      hover: "#0d33ff",
      blanco: "#ffffff",
      negro: "#000000",
    },
    extend: {},
  },
  plugins: [],
};
