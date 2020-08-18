/*
    Client-side webpack configuration for development phase
*/
const path = require('path');
const webpack = require('webpack');
const CWD = process.cwd();

const config = {
    name: "browser",
    mode: "development",    // sets process.env.NODE_ENV to a given value, defaults to a value of `production`
    devtool: "eval-source-map", // enable `Javascript source-maps in browser's devTools settings`
    entry: [
        "webpack-hot-middleware/client?reload=true",
        path.join(CWD, 'client/main.js')
    ],
    output: {
        path: path.join(CWD, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
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
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
};

module.exports = config;