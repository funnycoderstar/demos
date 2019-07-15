const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    // mode: 'development',
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    comments: true,
                }
            }
        }, ]
    },
    optimization: {
        minimize: true
    }
    // optimization: {
    //     usedExports: true
    // }
}
