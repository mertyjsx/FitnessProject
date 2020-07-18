module.exports = {
  //...
  output: {
    path: path.join(__dirname, '/build/static/js'),
    filename: 'index.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  }
};