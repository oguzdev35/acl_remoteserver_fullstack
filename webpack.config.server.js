/*
    Server-side webpack configuration for production phase
*/
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CWD = process.cwd();

// we will alse bundle serve side code, with proper
// configuration we increase performance. Webpack bundle and
// transpile(by babel) javascipt code so that a lot run-time
// related intermediate computations and object allocations get
// eliminated and handled at bundling process.
const config = {
    name: "server",
    mode: "production",
    entry: [
        path.join(CWD, "./server/server.js")
    ],
    target: "node",
    output: {
        path: path.join(CWD, "/dist/"),
        filename: "server.generated.js",
        publicPath: "/dist/",
        libraryTarget: "commonjs2"
    },
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
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