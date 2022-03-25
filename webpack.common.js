const path = require('path');
const dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CopyWebpackPlugin = require('copy-webpack-plugin')

const SRC_DIR = path.join(__dirname, '/client/src');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist')
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/src/index.html'),
      minify: true
    }),
    new dotenv({
      path: path.join(__dirname, '/.env')
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, './client/static')}
    //   ]
    // })
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            {
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime'
              ]
            }
          ]
        }
      },
       // Images
       {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: 
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        
      },
      // html
      {
        test: /\.(html)$/,
        use: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
