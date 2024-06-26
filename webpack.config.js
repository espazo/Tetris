import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from "clean-webpack-plugin";

export default {
    entry: './src/index.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'script/bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /.ts$/, use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
};
