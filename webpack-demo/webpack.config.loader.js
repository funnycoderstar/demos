const path = require('path');
const MyWebpackPlugin = require('./plugin/my-webpack-plugin');

module.exports = {
    entry: {
        app: './test.txt',
    },
    mode: 'development',
    output: {
        filename: '[name].txt',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    './loaders/toUpperCase.js',
                    './loaders/reverse.js',
                ]
            }
        ]
    },
    plugins: [
        new MyWebpackPlugin({
            name: 'hahah'
        }),
    ]
}