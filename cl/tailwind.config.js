/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryBackground: "#FFF7E9",
        primaryBrown: "#9b6c46",
        primaryYellow: "#FBE2A5",
        primaryRed: "#FB5957",
        primaryBlue: "#6877e9",
        primaryBlack: "#161616",
        primaryGreen: "#124947",
        secondaryBlue: "rgba(104, 119, 233,0.5)",
        secondaryRed: "rgba(251, 89, 87,0.5)",
        completed: "#a0c0ff",
        cancelled: "#ffb0a0",
      },
      cursor: {
        almond: 'url("../assets/images/almond2.png"), default',
      },
    },
  },
};
