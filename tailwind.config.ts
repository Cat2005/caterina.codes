import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        fontFamily: {
            newsreader: ["var(--font-newsreader)"],
            avantGardeMedium: ['var(--font-avant-garde)'],
            avantGardeBook: ['var(--font-avant-garde-book)'],
          },
          colors: {
            'hotpink': '#CA0079',
          }
    },
  },
  plugins: [],
}

export default config