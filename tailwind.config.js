/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      zIndex: {
        '1000': '1000',
        '500': '500',
      },
      minWidth: {
        '80': '320px',
        '64': '240px',
        '56': '224px',
      },
      maxWidth: {
        '52': '208px',
        '64': '240px',
        '72': '288px'
      },
      minHeight: {
        '80': '320px',
        '64': '240px',
        '56': '224px',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tw-elements/dist/plugin.cjs")
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "cyberpunk", "aqua"]
  },
  prefix: 'tw-',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
}
