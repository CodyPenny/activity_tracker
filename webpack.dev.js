const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')

module.exports = merge(
  common,
  {
    stats: 'errors-warnings',
    mode: 'development',
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
  }
)