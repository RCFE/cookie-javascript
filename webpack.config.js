const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: resolve('src/cookie.js'),
  devtool:'cheap-module-source-map',
  output: {
    path: resolve('dist'),
    filename: 'cookie.min.js',
    library: 'Cookie',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          fix: true
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(['dist']),
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
        // 开启 sourceMap
        sourceMap: true
    })
  ]
}
