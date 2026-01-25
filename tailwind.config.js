/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FFFFFF',
          dark: '#0f172a'
        },
        surface: {
          light: '#F8F9FA',
          dark: '#1e293b'
        },
        text: {
          primary: {
            light: '#111111',
            dark: '#f1f5f9'
          },
          secondary: {
            light: '#5F6C7B',
            dark: '#94a3b8'
          }
        },
        accent: '#2563EB',
        border: {
          light: '#E5E7EB',
          dark: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
      },
      spacing: {
        'section': '100px',
      }
    }
  },
  plugins: []
}
