const path = require('path');
const happypack = require('happypack')

const happyThreadPoor = happypack.ThreadPool({ size: 5});
module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'happy.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['happypack/loader?id=babel'],
                exclude: /node_modules/
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env'],
                //         comments: true,
                //     }
                // }
            }, 
            {
                test: /\.(css|less)$/,
                use: 'happypack/loader?id=styles'
            }
        ]
    },
    plugins: [
        new happypack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPoor,
        }),
        new happypack({
            id: 'styles',
            loaders: ['style-loader', 'css-loader', 'less-loader'],
            threadPool: happyThreadPoor,
        })
    ],
    optimization: {
        minimize: false
    }
}
