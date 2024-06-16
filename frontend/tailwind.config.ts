/** @type {import('tailwindcss').Config} */

import { nextui, colors } from '@nextui-org/react';

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5669FF',
        secondary: '#3D56F0'
      }
    }
  },
  plugins: [nextui()]
};
