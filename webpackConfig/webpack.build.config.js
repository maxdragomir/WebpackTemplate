const merge = require('webpack-merge'),
      PrettierPlugin = require('prettier-webpack-plugin'),
      baseWebpackConfig = require('./webpack.base.config'),

  buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
  });

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
});

