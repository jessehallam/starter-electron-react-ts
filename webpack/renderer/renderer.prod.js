const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const { spawn, execSync } = require('child_process');

const baseConfig = require('../webpack.config.base');

const port = process.env.PORT || 1818;
const publicPath = `http://localhost:${port}/dist`;

module.exports = merge.smart(baseConfig, {
    devtool: 'source-map',
    mode: 'production',
    target: 'electron-renderer',

    entry: [
        path.join(__dirname, '../../app/index')
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader', // TODO: Do we want to use style-loader in prod?
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, '../../electron/dist'),
        publicPath: 'dist/',
        filename: 'renderer.js'
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    }
})