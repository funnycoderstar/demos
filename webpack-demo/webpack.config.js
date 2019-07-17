const path = require('path');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '渐进式网络应用程序',
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用ServiceWorkers
            // 不允许遗留任何”旧“ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        })
    ]
}