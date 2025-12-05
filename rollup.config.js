import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/lexicon-form.min.js",
      format: "iife",
      name: "LexiconForm",
    },
    {
      file: "dist/lexicon-form.esm.js",
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    terser({
      compress: {
        passes: 2,
      },
    }),
  ],
};
