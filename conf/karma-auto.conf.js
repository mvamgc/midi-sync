const conf = require('./gulp.conf');
const path = require('path');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: false,
    autoWatch: true,
    logLevel: 'INFO',
    junitReporter: {
      outputDir: 'test-reports'
    },
    browsers: [
      'PhantomJS' // 'Chrome'
    ],
    frameworks: [
      'jasmine'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      conf.path.src('index.spec.js')
    ],
    preprocessors: {
      [conf.path.src('index.spec.js')]: [
        'webpack'
      ]
    },
    reporters: ['progress', 'coverage-istanbul', 'junit'],

    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'cobertura'],
      dir: conf.path.reports('coverage'),
      fixWebpackSourcePaths: true,
      html: {
        subdir: 'html'
      }
    },
    webpack: require('./webpack-test.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      // require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack')
    ]
  };

  config.set(configuration);
};
