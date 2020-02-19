const path = require('path'),
      fs = require('fs'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      { VueLoaderPlugin } = require('vue-loader'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../myBuild'),
  assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`,
      PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src,
    // appRTL: `${PATHS.src}/appRTL.js`
  },

  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: ''
  },

  optimization: {
    minimize: true,
  },

  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        "pretty": true
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        },
      ]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: MiniCssExtractPlugin.loader,
          options: {hmr: process.env.NODE_ENV === 'development'}
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true}
        },
        {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: `./webpackConfig/postcss.config.js`}}
        },
        {
          loader: 'sass-loader',
          options: {sourceMap: true}
        },

      ]
    }]
  },

  resolve: {
    alias: {
      '~': 'src',
      'vue$': 'vue/dist/vue.js'
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.src}/index.html`,
    //   filename: './index.html'
    // }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts`},
    ]),

    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}styles/[name].[hash].css`
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      inject: false,
      minify: {
        collapseWhitespace: false,
        preserveLineBreaks: false,
        removeComments: false
      },
      // filename: `./${page.replace(/\.pug/,'.php')}`
    })),
  ]
};























