const path = require('path');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './index.js',
    },
    mode: 'production',
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
        // new CleanWebpackPlugin(),
    ]
}