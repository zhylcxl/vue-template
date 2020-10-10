const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');

const baseConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:7].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_module/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]'),
            esModule: false
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
          esModule: false
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      favicon: path.resolve(__dirname, '../src/assets/img/tc.ico')
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './static',
          to: '/static',
          globOptions: {
            ignore: '.*'
          }
        }
      ]
    })
  ]
}

module.exports = baseConfig;