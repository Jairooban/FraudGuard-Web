/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060A14', // deep pitch navy
          900: '#0B1020', // default dark background
          850: '#0E152A',
          800: '#121A30', // card background dark
          750: '#18223E',
          700: '#1E293B', // border subtle dark
          600: '#334155',
        },
        risk: {
          low: '#10B981',      // Emerald green
          'low-bg': '#064E3B',
          medium: '#F59E0B',   // Amber
          'medium-bg': '#78350F',
          high: '#EF4444',     // Red
          'high-bg': '#7F1D1D',
        },
        accent: {
          indigo: '#6366F1',
          teal: '#14B8A6',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      keyframes: {
        pulseHighlight: {
          '0%': { backgroundColor: 'rgba(20, 184, 166, 0.25)' },
          '100%': { backgroundColor: 'transparent' }
        }
      },
      animation: {
        'row-highlight': 'pulseHighlight 2s ease-out 1',
      }
    },
  },
  plugins: [],
}
