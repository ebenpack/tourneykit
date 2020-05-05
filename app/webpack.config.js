const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mountPoint = "app";

const publicAssetPath = "/static/";
const appPath = path.resolve(__dirname);
const staticPath = path.resolve(appPath, "..", "static");
const srcPath = path.resolve(appPath, "src");

module.exports = {
    entry: {
        app: path.resolve(srcPath, "app.tsx"),
    },
    output: {
        path: staticPath,
        publicPath: publicAssetPath,
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.[jt]s(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: staticPath,
                        },
                    },
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"],
                }),
            },
            {
                test: /\.png$/,
                use: ["file-loader"],
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(
                appPath,
                "..",
                "tourney",
                "templates",
                "spa_index.html"
            ),
            template: path.resolve(srcPath, "index.ejs"),
            inject: "head",
            hash: true,
            templateParameters: {
                mountPoint,
            },
        }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
};
