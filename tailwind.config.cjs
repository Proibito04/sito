/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        didat: ["Montserrat", "Times New Roman, serif"],
        work: ["Outfit", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
