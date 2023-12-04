import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // plugin(function({ addBase, theme }) {
    //   addBase({
    //     'h1': { fontSize: theme('fontSize.5xl'), fontWeight: theme('fontWeight.semibold') },
    //     'h2': { fontSize: theme('fontSize.4xl'), fontWeight: theme('fontWeight.bold') },
    //     'h3': { fontSize: theme('fontSize.3xl'), fontWeight: theme('fontWeight.semibold') },
    //     'h4': { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.medium') },
    //     'h5': { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.medium') },
    //     'h6': { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.medium') },
    //     'p': { fontSize: theme('fontSize.base'), fontWeight: theme('fontWeight.normal') },
    //     'label': { fontSize: theme('fontSize.base'), fontWeight: theme('fontWeight.normal') },
    //   })
    // })
  ]
}
export default config
