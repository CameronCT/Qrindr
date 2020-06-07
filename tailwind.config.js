module.exports = {
  purge: {
    enabled: true,
    content: [
      'public/*.html',
      'public/qrindr/*.html',
      'public/qrindr/views/components/*.html',
      'public/qrindr/views/layout/*.html',
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
