const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './app.js',
  mode: 'production',
  target: 'node', // 为了忽略诸如path、fs等内置模块。
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: path.resolve(__dirname, 'statics'),
  },
  node: {},
  externals: [nodeExternals()], // 以忽略节点\模块文件夹中的所有模块
  module: {},
  plugins: [],
  resolve: {},
}
