const path = require("path");

module.exports = {
  devtool: "source-map",
  target: "electron-main",
  entry: path.resolve(__dirname, "./src/app.ts"),
  node: {
    __dirname: false
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".json"] // note if using webpack 1 you'd also need a '' in the array as well
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
  plugins: []
};
