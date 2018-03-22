'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// Mutiple Page
var entries = utils.getEntry('./src/views/**/*.js')
var pages = utils.getEntry('./src/views/**/*.html')

// Mutiple Vendors
entries.vendor1 = ['vue']
entries.vendor2 = ['core-js']
entries.vendor3 = ['zepto', resolve('src/plugins/APIPlugin.js')]

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': process.env.NODE_ENV === 'production' ? 'vue/dist/vue.runtime.esm.js' : 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('images/[name].[ext]?v=[hash:7]')
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: process.env.NODE_ENV === 'production',
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: false, // disabled
              pngquant: {
                floyd: 0.5,
                speed: 2
              },
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { convertPathData: false }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.html$/,
        use:[{
          loader: 'swig-loader',
          options: {
            minimize: false
          }
        }]
      },
      // https://github.com/madrobby/zepto/pull/1244
      // https://sebastianblade.com/how-to-import-unmodular-library-like-zepto/
      {
        test: /\/node_modules\/zepto\/dist\/zepto\.js$/,
        loader: 'imports-loader?this=>window'
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: process.env.NODE_ENV === 'production'
    ? { maxAssetSize: 102000, hints: 'warning' }
    : {},
  plugins: []
}

for (let filename in pages) {
  let config = {
    filename: filename + '.html',
    template: pages[filename],
    inject: true,
    chunks: [filename, 'vendor1', 'vendor2', 'vendor3', 'manifest'],
    hash: false,
    minify: process.env.NODE_ENV === 'production'
            ? { removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                minifyJS: true,
                minifyCSS: true,
              }
            : false,
    chunksSortMode: 'dependency',
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(config))
}
