var path = require('path');

module.exports = [{
    mode: process.env.WEBPACK_ENV,
    entry: ['./src/main.ts'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
     },
    
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
     },
    
    // module: {
    //     rules: [{
    //         test: /\.(css|sass|scss)$/,
    //         use: [
    //             'style-loader',
    //             'css-loader',
    //             'sass-loader'
    //         ]
    //     }]
    //  }
}];