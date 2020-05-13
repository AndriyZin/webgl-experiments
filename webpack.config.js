const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist' );

module.exports = {
    context: ROOT,

    entry: {
        'main': './main.ts'
    },
    
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },

    devtool: 'cheap-module-source-map',
    devServer: {}
};

