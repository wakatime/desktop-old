const path = require("path");

module.exports = {
  devtool: "inline-cheap-source-map",
  entry: path.resolve(__dirname, "./src/containers/index.tsx"),
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
            loader: "ts-loader",
            options: {
              esModuleInterop: true
            }
          }
        ]
      }
    ]
  }
};
