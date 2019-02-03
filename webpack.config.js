var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var pkg = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const banner = `
  ${pkg.name} - ${pkg.description}
  Author: ${pkg.author}
  Version: v${pkg.version}
  URL: ${pkg.homepage}
  License: ${pkg.license}
`;

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'sass-loader'
                },
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      path.resolve(__dirname, './src/assets/scss/_variables.scss'),
                      path.resolve(__dirname, './src/assets/scss/_mixins.scss'),
                    ]
                  }
                }
              ]
            }
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?removeSVGTagAttrs=false'
      },
      {
        test: /\.(png|jpg|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          name (file) {
            return '/[path][name].[ext]';
          }
        }
      },
      {
        test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin(config),
    new webpack.BannerPlugin({
      banner
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ProvidePlugin({
      THREE: "three"
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/json', to: 'src/assets/json' }
    ])
  ]
};

if (process.env.NODE_ENV === 'production') {

  module.exports.devtool = false;
  // module.exports.output.filename = '[name].[hash].js';

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true,
    //   chunksSortMode: 'dependency'
    // })
  ]);

}
