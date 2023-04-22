export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-replace': {
      pattern: /(--tw|\*, ::before, ::after)/g,
      data: {
        '--tw': '--rsl-tw', // Prefixing
        '*, ::before, ::after': ':root', // So variables does not pollute every element
      },
    },
  },
}
