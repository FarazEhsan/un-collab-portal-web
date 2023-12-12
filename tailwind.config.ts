import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#5090CD',
        'custom-teal':'#00AF9A',
        'custom-orange':'#FCB740',
        'custom-red':'#ED293B',
        'custom-gray':'#F4F4F4',
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
