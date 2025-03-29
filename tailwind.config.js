/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: 'rgb(138, 43, 226)',
          500: 'rgb(128, 33, 216)',
          600: 'rgb(118, 23, 206)',
          700: 'rgb(108, 13, 196)',
          800: 'rgb(98, 3, 186)',
          900: 'rgb(88, 0, 176)',
        },
        blue: {
          400: 'rgb(0, 191, 255)',
          500: 'rgb(0, 181, 245)',
        },
        pink: {
          400: 'rgb(255, 105, 180)',
          500: 'rgb(245, 95, 170)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-purple-400',
    'bg-purple-500',
    'bg-purple-600',
    'bg-purple-700',
    'bg-purple-800',
    'bg-purple-900',
    'text-purple-400',
    'text-purple-500',
    'text-purple-600',
    'text-purple-700',
    'text-purple-800',
    'text-purple-900',
    'hover:bg-purple-600',
    'hover:bg-purple-700',
    'border-purple-900',
    'ring-purple-500',
    'ring-purple-900',
  ]
}
