var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',

    entry: './src/main.js',

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: './public',
    }
};