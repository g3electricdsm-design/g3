import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#6D0091',
        'earle-black': '#242729',
        'white-smoke': '#F2F2F2',
        'hookers-green': '#748680',
        'phlox': '#C636FF',
      },
      fontFamily: {
        'megrim': ['Megrim', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
