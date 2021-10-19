var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
    alias: {
      React: path.resolve(__dirname, "./node_modules/react/"),
      react: path.resolve(__dirname, "./node_modules/react/"),
      ReactDOM: path.resolve(__dirname, "./node_modules/react-dom/"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/"),
    },
  },
  devServer: {
    port: 3003,
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)?$/,
        type: "javascript/auto",
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        /* The following line to ask babel 
                     to compile any file with extension
                     .js */
        test: /\.(mjs|js|jsx|tsx|ts)?$/,
        resolve: {
          fullySpecified: false,
        },
        /* exclude node_modules directory from babel. 
                    Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "MFEDynamic",
      filename: "remoteEntry.js",
      exposes: {
        "./Tile": "./src/Tile"
      },
      shared: {
        ...deps,
        react: {
          requiredVersion: deps.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true,
        },
        "context-library": {
          import: "../context-library/dist/index.esm.js",
          requiredVersion: require("../context-library/package.json").version,
          singleton: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
