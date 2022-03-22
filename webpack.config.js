const path = require('path');
const dotenv = require('dotenv-webpack')
const portFinderSync = require('portfinder-sync')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Directories
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist')
  },
  stats: 'errors-warnings',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/src/index.html'),
      minify: true
    }),
    new dotenv({
      path: path.join(__dirname, '/.env')
    })
  ],
  devServer: {
    host: 'local-ip',
    historyApiFallback: true,
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: 'auto',
    hot: false,
    watchFiles: ['src/**', 'static/**'],
    static: {
      watch: true,
      directory: path.join(__dirname, '../static')
    },
    client: {
      logging: 'none',
      overlay: true,
      progress: false
    }
  },
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
