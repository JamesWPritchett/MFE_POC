var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode: 'development',
    entry: "./src/index",
    output: {
        path: path.join(__dirname, "dist/"),
        filename: '[contenthash].js',
        clean: true
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.mjs'],
    },
    devServer: {
        port: 3001,
    },
    module: {
        rules: [
            {
                test: /\.(mjs|js|jsx)?$/,
                type: "javascript/auto",
                include: /node_modules/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                /* The following line to ask babel 
                     to compile any file with extension
                     .js */
                test: /\.(mjs|js|jsx|tsx|ts)?$/,
                resolve: {
                    fullySpecified: false
                },
                /* exclude node_modules directory from babel. 
                    Babel will not compile any files in this directory*/
                exclude: /node_modules/,
                // To Use babel Loader
                loader:
                    'babel-loader',
                options: {
                    "presets": [
                        "@babel/preset-env",
                        ["@babel/preset-react", { "runtime": "automatic" }]
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'MFE1',
                filename:
                    'remoteEntry.js',
                exposes: {
                    './Button':
                        './src/Button',
                },
            }
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};