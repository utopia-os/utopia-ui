/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
  prefix: 'tw-',
}
