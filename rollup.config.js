const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const license = require('rollup-plugin-license');
const json = require('rollup-plugin-json');
const { terser } = require('rollup-plugin-terser');
const globals = require('rollup-plugin-node-globals');

const pkg = require('./package.json');

const OUTPUT_PATH = 'static';

const PLUGINS = [
  resolve(),
  commonjs(),
  json(),
  globals(),
  terser({
    compress: { warnings: false },
    output: { comments: false },
    mangle: false
  }),
  license({
    banner: `
    <%= pkg.name %> v<%= pkg.version %>
    Author: Pluggy
    Date: <%= moment().format('YYYY-MM-DD') %>
    License: MIT
    `
  })
];

export default [
  {
    input: 'dist/index.js',
    output: [
      {
        name: 'pluggy',
        file: `${OUTPUT_PATH}/pluggy.js`,
        format: 'umd',
        sourcemap: true,
        exports: 'named'
      },
    ],
    plugins: PLUGINS
  },
];