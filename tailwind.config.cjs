/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'bg-glass': 'var(--bg-glass)',
        'border-glow': 'var(--border-glow)',
      }
    }
  },
  plugins: []
};
