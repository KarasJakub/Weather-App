const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    plugins: [
        new MiniCssExtractPlugin()
    ],
    mode: mode,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, 
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devtool: 'source-map',
    
    devServer: {
        static: './dist',
        hot: true,
        port: 5500
    }
}









// entry: './src/index.js',
// output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'public') 
// },