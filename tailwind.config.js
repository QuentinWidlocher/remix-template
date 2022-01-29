const path = require('path')
const fromRoot = p => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
