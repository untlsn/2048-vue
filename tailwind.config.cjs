module.exports = {
  extract: {
    include: ['**/*.{vue,css}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    extend: {
      spacing: {
        header: '4rem',
        catalogs: '3rem',
      },
      colors: {
        main: {
          blue: '#390099',
          purple: '#d51755',
          fuchsia: '#FF0054',
          orange: '#FF5400',
          yellow: '#FFBD00',
        },
      },
    },
  },
};
