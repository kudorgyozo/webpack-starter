var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    //'style-loader', // creates style nodes from JS strings
                    MiniCssExtractPlugin.loader, //creates a file
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'main.css',
            chunkFilename: '[id].css',
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Custom template',
        //     // Load a custom template (lodash by default)
        //     template: './src/index.html'
        // }),
        new CopyWebpackPlugin([
                // {output}/file.txt
                { from: 'src/index.html' }
            ], {
                // By default, we only copy modified files during
                // a watch or webpack-dev-server build. Setting this
                // to `true` copies all files.
                copyUnmodified: false
            })

    ]
};