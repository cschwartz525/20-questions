const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const { NODE_ENV = 'production' } = process.env;

const client = {
    devtool: 'source-map',
    entry: './src/client/index.tsx',
    mode: NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.[hash].js',
        clean: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            favicon: './src/client/assets/favicon.ico'
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx']
    }
};

const server = {
    entry: './src/server/index.ts',
    externals: {
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate'
    },
    mode: NODE_ENV,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node'
};

module.exports = [
    client,
    server
];