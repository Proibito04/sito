const marginHR = "2rem";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            hr: {
              marginTop: marginHR,
              marginBottom: marginHR,
            },
          },
        },
      },
      colors: {
        BGprimary: "#080F09",
        primary: "#4AF72F",
        primaryDark: "#bcdd9f",
      },
      fontFamily: {
        didat: ["Montserrat", "Times New Roman, serif"],
        work: ["Poppins", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
