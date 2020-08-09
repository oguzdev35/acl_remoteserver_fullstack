/*
    Client-side webpack configuration for production phase
*/
const path = require('path');
const webpack = require('webpack');
const CWD = process.cwd();

const config = {
    mode: "production",
    entry: [
        path.join(CWD, "client/main.js")
    ],
    output: {
        path: path.join(CWD, "/dist"),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
};

module.exports = config;
