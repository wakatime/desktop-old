/**
 * Created by v0n000p on 2/19/17.
 */

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const path = require("path");
// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

// eslint-disable-next-line no-console
console.log("isProduction", isProduction);

const plugins = [];
const optimization = {};

if (isProduction) {
  optimization.minimizer = [new UglifyJsPlugin()];
}

module.exports = {
  entry: path.resolve(__dirname, "./src/containers/index.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"] // note if using webpack 1 you'd also need a '' in the array as well
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  optimization,
  plugins
};
