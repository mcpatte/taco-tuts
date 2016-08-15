var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'tests/**/*.js'
    ],
    preprocessors: {
      'tests/**/*.ts': ['webpack'],
      'tests/**/*.js': ['browserify']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-jasmine'
    ]
  })
}
