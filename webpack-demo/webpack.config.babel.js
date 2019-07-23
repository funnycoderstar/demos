const path = require('path');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'babelDist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}