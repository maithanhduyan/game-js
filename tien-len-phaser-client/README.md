# Tiến Lên Game sử dụng Phaser

Create new project
> mkdir tien-len-phaser-client
> cd tien-len-phase-client
> npm init -y
> npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev

> npm install @babel/core @babel/preset-env  babel-loader html-loader --save-dev

create file webpack.config.js with content:
~~~~
onst HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html'
    })
  ]
}

~~~~
Create file index.js in /src directory

Test webpack compile
> npx webpack

Install Phase for project
> npm install -D phaser