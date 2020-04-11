import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import json from 'rollup-plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import fs from 'fs';

require('dotenv').config();

const env = process.env.NODE_ENV;
const prod = process.env.BUILD === 'production';

export default {
  input: 'src/main.jsx',
  output: {
    sourcemap: !prod,
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    commonjs(),
    json(),
    sourcemaps(),
    babel({
      exclude: 'node_modules/**',
    }),
    !prod &&
      serve({
        contentBase: 'dist',
        host: 'localhost',
        port: 8044,
        ...(process.env.SSL_KEY && process.env.SSL_CRT && process.env.SSL_PEM
          ? {
              https: {
                key: fs.readFileSync(process.env.SSL_KEY),
                cert: fs.readFileSync(process.env.SSL_CRT),
                ca: fs.readFileSync(process.env.SSL_PEM),
              },
            }
          : {}),
      }),
    !prod && livereload(), // does not work :(
  ],
};
