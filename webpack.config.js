const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    main: './src/index.js'
  }
    ,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    sourceMapFilename: "bundle.map",
    libraryTarget: 'var',
    library: 'ui'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: './src/index.html'
    }), // Generates default index.html
    new HtmlWebPackPlugin({  // Also generate a test.html
      filename: 'captchaRecog.html',
      template: './src/captchaRecog.html',
    })
  ]
};