module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f82c38",

          light: "#EDEDED",

          dark: "#191D1E",

          "base-100": "#FFFFFF",

          info: "#433c2c",

          success: "#6CEFB8",

          warning: "#EABE2E",

          error: "#E73C5E"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}