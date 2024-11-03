/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        success: colors.green,
        primary: colors.blue,
        danger: colors.red,
        warning: colors.yellow,
        textDinamic: "var(--navbar-text)",
        iconDinamic: "var(--navbar-icon)",
        trello: "#0c66e4",
        trelloHover: "#0055cc",
        trelloFocus: "#388bff",
        trelloShadow: "#2684ff99",
        trelloBgNeutral: "#091e420f",
        trelloBgNeutralHover: "#091e4224",
        trelloBgNeutralPressed: "#091e424f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
