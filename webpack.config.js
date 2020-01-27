const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const output = {
  path: path.resolve(__dirname, './dist'),
  filename: '[name].js',
};
const devtool = isDev ? 'source-map' : undefined;
const resolve = {
  // Add `.ts` and `.tsx` as a resolvable extension.
  extensions: ['.ts', '.tsx', '.js', '.json'], // note if using webpack 1 you'd also need a '' in the array as well
};
const tsloader = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'ts-loader',
    },
  ],
};
if (isDev) {
  tsloader.use = ['cache-loader', ...tsloader.use];
}
const fileLoader = {
  test: /\.(png|jpe?g|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name() {
          return '[path][name].[ext]';
        },
      },
    },
  ],
};
if (isDev) {
  fileLoader.use = ['cache-loader', ...fileLoader.use];
}
const commonWebpackCfg = {
  devtool,
  output,
  resolve,
  module: {
    rules: [tsloader, fileLoader],
  },
};
const mainProcessWebpackCfg = {
  ...commonWebpackCfg,
  target: 'electron-main',
  entry: {
    app: path.resolve(__dirname, './src/app.ts'),
  },
  node: {
    __dirname: isDev,
  },
  plugins: [],
};
const rendererWebpackCfg = {
  ...commonWebpackCfg,
  target: 'electron-renderer',
  entry: {
    mainUI: path.resolve(__dirname, './src/containers/index.tsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'html', 'index.html'),
    }),
  ],
};
module.exports = [mainProcessWebpackCfg, rendererWebpackCfg];
