import css from 'rollup-plugin-css-only';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    formate: 'es',
  },
  plugins: [css({ output: 'dist/bundle.css' })],
};
