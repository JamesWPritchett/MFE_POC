import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

const commonUmdOutput = {
  format: "umd",
  sourcemap: true,
  name: "MFEContextLibrary",
  globals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

export default [
  {
    input: pkg.source,
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    output: [
      { file: pkg.main, format: "cjs", exports: "named" },
      { file: pkg.module, format: "esm" },
      {
        ...commonUmdOutput,
        file: pkg.browser,
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      resolve(),
      commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: ["node_modules/**"], // Default: undefined
        sourceMap: false,
      }),
      postcss({
        // mode: 'extract',
        exclude: ["dist"],
        include: ["src/**"],
        use: ["sass"],
        inject: true,
        extract: false,
      }),
      external(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      })
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
  {
    input: pkg.source,
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    output: [
      {
        ...commonUmdOutput,
        file: "dist/index.js",
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      resolve(),
      commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: ["node_modules/**"], // Default: undefined
        sourceMap: false,
      }),
      postcss({
        // mode: 'extract',
        exclude: ["dist"],
        include: ["src/**"],
        use: ["sass"],
        inject: true,
        extract: false,
      }),
      external(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      })
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  }
];
