/**
 * Created by v0n000p on 2/19/17.
 */
const path = require('path');
const webpack = require('webpack');
const isProduction = (process.env.NODE_ENV === 'production');

console.log('isProduction', isProduction);

const plugins = [];
const loaders = [
    { test: /\.tsx?$/, loader: 'ts-loader' }
];
if(isProduction){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}else {

}
module.exports = {
    entry: path.resolve(__dirname, '../src/containers/index.ts'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module:{
        loaders:loaders
    },
    plugins:plugins
};