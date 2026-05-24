/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kids: {
          yellow: {
            light: '#FEF9C3',
            DEFAULT: '#FDE047',
            dark: '#EAB308',
          },
          orange: {
            light: '#FFEDD5',
            DEFAULT: '#FB923C',
            dark: '#EA580C',
          },
          pink: {
            light: '#FCE7F3',
            DEFAULT: '#F472B6',
            dark: '#DB2777',
          },
          blue: {
            light: '#E0F2FE',
            DEFAULT: '#38BDF8',
            dark: '#0284C7',
          },
          purple: {
            light: '#F3E8FF',
            DEFAULT: '#C084FC',
            dark: '#9333EA',
          },
          green: {
            light: '#DCFCE7',
            DEFAULT: '#4ADE80',
            dark: '#16A34A',
          },
          cream: '#FFFBEB',
          softBg: '#F8FAFC',
        }
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        baloo: ['"Baloo 2"', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pop-in': 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'kids': '0 6px 0px 0px rgba(0, 0, 0, 0.1)',
        'kids-active': '0 2px 0px 0px rgba(0, 0, 0, 0.1)',
        'kids-purple': '0 6px 0px 0px #9333EA',
        'kids-yellow': '0 6px 0px 0px #EAB308',
        'kids-blue': '0 6px 0px 0px #0284C7',
        'kids-orange': '0 6px 0px 0px #EA580C',
        'kids-pink': '0 6px 0px 0px #DB2777',
        'kids-green': '0 6px 0px 0px #16A34A',
      }
    },
  },
  plugins: [],
}
