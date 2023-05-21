/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: { 
    extend: {
      fontFamily: {
        didat: "didact-gothic, Times New Roman, serif",
        work: "work-sans, Times New Roman, serif",
      },
    },
  },
  plugins: [],
};
