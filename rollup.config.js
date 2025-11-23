import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 *
 * @license ${pkg.license}
 * @author ${pkg.author.name}
 * @repository ${pkg.repository.url}
 */`;

const plugins = (declaration = false) => [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true,
  }),
  typescript({
    tsconfig: './tsconfig.json',
    declaration,
    declarationDir: declaration ? './dist' : undefined,
  }),
];

export default [
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'autocompletePlugin',
      banner,
      sourcemap: true,
    },
    external: ['flatpickr'],
    plugins: plugins(true),
  },
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/index.js',
      format: 'es',
      banner,
      sourcemap: true,
    },
    external: ['flatpickr'],
    plugins: plugins(false),
  },
];
