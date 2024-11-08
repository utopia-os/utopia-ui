/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-commonjs
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  safelist: [
    'tw-mask-squircle',
    'tw-mask-circle',
    'tw-mask-hexagon-2',
    'tw-mask-decagon',
    'tw-bg-[#FF99C8]',
    'tw-bg-[#fff0d6]',
    'tw-bg-[#FCF6BD]',
    'tw-bg-[#D0F4DE]',
    'tw-bg-[#A9DEF9]',
    'tw-bg-[#E4C1F9]',
    'tw-bg-[#de324c]',
    'tw-bg-[#f4895f]',
    'tw-bg-[#f8e16f]',
    'tw-bg-[#95cf92]',
    'tw-bg-[#369acc]',
    'tw-bg-[#9656a2]',
  ],
  theme: {
    extend: {
      zIndex: {
        3000: '3000',
        2000: '2000',
        1000: '1000',
        500: '500',
      },
      minWidth: {
        80: '320px',
        64: '240px',
        56: '224px',
      },
      maxWidth: {
        52: '208px',
        64: '240px',
        72: '288px',
      },
      minHeight: {
        80: '320px',
        64: '240px',
        56: '224px',
      },
      fontFamily: {
        sans: ['Helvetica', 'sans-serif', 'Roboto'],
      },
      fontSize: {
        map: '13px',
      },
      lineHeight: {
        map: '1.4em',
      },
    },
    keyframes: {
      pulseGrow: {
        '0%, 100%': { transform: 'scale(1.00)' },
        '80%': { transform: 'scale(1.00)' },
        '90%': { transform: 'scale(0.95)' },
      },
    },
    animation: {
      pulseGrow: 'pulseGrow 2s ease-in-out infinite',
    },
  },
  // eslint-disable-next-line import/no-commonjs, import/extensions
  plugins: [require('daisyui'), require('tw-elements/dist/plugin.cjs')],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'retro',
      'cyberpunk',
      'aqua',
      {
        docutopia: {
          primary: '#8e00ff',
          secondary: '#00bb7a',
          accent: '#006aff',
          neutral: '#231502',
          'base-content': '#ffad6b',
          'base-100': '#440844',
        },
      },
    ],
  },
  prefix: 'tw-',
  // content: ['./src/**/*.{js,jsx,ts,tsx}'],
}
