/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Ocean-inspired athletic palette
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        athletic: {
          primary: '#0369a1', // Deep ocean blue
          secondary: '#0ea5e9', // Coastal blue
          accent: '#06b6d4', // Bright cyan
          success: '#10b981', // Seafoam green
          dark: '#1f2937', // Charcoal
          light: '#f8fafc', // Clean white-blue
        },
        gradient: {
          'ocean-start': '#0369a1',
          'ocean-end': '#0ea5e9',
          'sky-start': '#38bdf8',
          'sky-end': '#e0f2fe',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'athletic': '0 10px 30px -5px rgba(3, 105, 161, 0.3)',
        'ocean': '0 20px 40px -10px rgba(14, 165, 233, 0.2)',
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
        'gradient-sky': 'linear-gradient(135deg, #38bdf8 0%, #e0f2fe 100%)',
        'gradient-athletic': 'linear-gradient(135deg, #1f2937 0%, #0369a1 100%)',
      },
    },
  },
  plugins: [],
}