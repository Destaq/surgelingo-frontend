module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: [
    "./components/**/*.{vue,js}",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./nuxt.config.js"
  ],
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px"
      // => @media (min-width: 1536px) { ... }
    }
    // container: theme => ({
    //   // To center containers by default
    //   center: true,

    //   // To add horizontal padding by default
    //   padding: {
    //     default: theme("spacing.4"),
    //     medium: theme("spacing.20"),
    //     large: theme("spacing.8")
    //   }
    // })
  },
};
