const CopyPlugin = require('copy-webpack-plugin');
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
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'public')
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx']
    }
};

const server = {
    entry: './src/server/index.ts',
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