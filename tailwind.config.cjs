module.exports = {
  content: ['./*.html', './en/*.html', './assets/site.js'],
  theme: {
    extend: {
      colors: {
        beige: { 50: '#FAF7F3', 100: '#F4E8D8', 200: '#E9DCC9', 300: '#DEC9B0', 400: '#D4B697' },
        accent: '#E07830',
        'accent-dark': '#C56524'
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  }
};
