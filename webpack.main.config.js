const webpack = require("webpack");
const path = require("path");

const outputPath = path.join(__dirname, "dist");
module.exports = {
  devtool: "source-map",
  target: "electron-main",
  entry: path.resolve(__dirname, "./src/app.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js"
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
  plugins: [
    new webpack.EnvironmentPlugin({
      outputPath: outputPath
    })
  ]
};
