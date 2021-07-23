var path = require('path');

var dev = {
    entry: { main: './main.js' },
    resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
};

var prod = {
    entry: { main: './main.js' },
    resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production'
};
module.exports = dev;