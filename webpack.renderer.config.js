const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "html", "index.html")
  })
];
module.exports = {
  devtool: "source-map",
  target: process.env.DEV === "true" ? "web" : "electron-renderer",
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
              configFile: "webpack.tsconfig.json"
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name() {
                if (
                  process.env.NODE_ENV === "development" ||
                  process.env.DEV === "true"
                ) {
                  return "[path][name].[ext]";
                }

                return "[hash].[ext]";
              }
            }
          }
        ]
      }
    ]
  },
  plugins
};
