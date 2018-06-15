var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
      './app/app.jsx'
    ],
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
        rules: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader']},
          { 
            test: /\.global\.css$/,
            use : [
              { loader: 'style-loader'},
              { loader: 'css-loader'}
            ] 
          },
          {
            test:  /^((?!\.global).)*\.css$/,
            use: [
              { loader: 'style-loader'},
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                }
              }
            ] 
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new ExtractTextPlugin({filename: '[name].css'})
    ]
  };