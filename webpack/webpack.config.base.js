const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },

    output: {
        path: path.join(__dirname, '../dist')
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        }),

        new webpack.NamedModulesPlugin()
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }
}