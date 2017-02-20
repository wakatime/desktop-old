/**
 * Created by v0n000p on 2/19/17.
 */
const path = require('path');
const webpack = require('webpack');
const isProduction = (process.env.NODE_ENV === 'production');

console.log('isProduction', isProduction);

const plugins = [];
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
    plugins:plugins
};