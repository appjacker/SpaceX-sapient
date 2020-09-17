const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const browserConfig = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
          },
        },
        'css-loader', 
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
    },
    ]
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
          },
        },
        'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
    },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}

module.exports = [browserConfig, serverConfig,]