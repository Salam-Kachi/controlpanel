const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        'app':'./src/index.js',
    },
    output: {
        path: path.join(__dirname, '/app'),
        filename: 'app.js',
    },
    devServer: {
        static: {
          directory: path.join(__dirname, './app'),
        },
        compress: true,
        port: 8081,
        open: true,
        devMiddleware: {
          writeToDisk: true,
        },
      },
    module: {
        rules: [
          {
            test: /\.html$/i,
            use:[
                {
                    loader: 'html-loader',
                }
            ]            
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use:[
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader',

            ]
          },
          {
            test: /\.(svg|eot|woof|woof2|)$/,
            exclude:/iamge/,
            use:[
              {
                loader:"file-loader",
                options:{
                  name:'[name].[ext]',
                  outputPath:"assets/fonts"
                }
              }
            ]            
          }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin({}),
        new MiniCssExtractPlugin({
          filename:"assets/css/style.css",
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
    ]
}
