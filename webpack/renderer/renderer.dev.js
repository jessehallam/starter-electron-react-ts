const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const { spawn, execSync } = require('child_process');

const baseConfig = require('../webpack.config.base');

const port = process.env.PORT || 1818;
const publicPath = `http://localhost:${port}/dist`;

module.exports = merge.smart(baseConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'electron-renderer',

    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../../app/index')
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: publicPath,
        filename: 'renderer.js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            if (process.env.START_HOT) {
                setTimeout(() => {
                    spawn('npm', ['run', 'start-main-dev'], {
                        shell: true,
                        env: process.env,
                        stdio: 'inherit'
                    })  .on('close', code => process.exit(code))
                        .on('error', err => console.error(err))
                }, 3000)
                console.log('Starting Main Process...');
            }
        }
    }
})