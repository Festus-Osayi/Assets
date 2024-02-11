/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'navColor': '#070F1A',
        'greyTextColor': '#A9ADB8',
        'headingColor': '#FDC545',
        'sectionBgDark': '#202121',
        "sectionBgLight": '#2B2A2A',
        'btnResumeColor': '#4F4F4E'
      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
      },
    }


  },
  plugins: [],
}
