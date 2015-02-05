module.exports = function(config) {
  'use strict';

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // List of files or patterns to load in the browser
    files: [
    { pattern: 'src/**/*.js', included: false },
    { pattern: 'test/spec/**/*.js', included: true }
    ],

    // list of files to exclude
    exclude: [
    'src/_*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/spec/**/*.js': ['browserify']
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine', 'sinon'],

    // Enable or disable watching files and executing the tests
    // whenever one of these files changes.
    autoWatch: false,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    browserify: {
      debug: true,
      transform: ['browserify-istanbul']
    },

    coverageReporter: {
      reporters: [
      { type: 'html', dir: 'reports/test/unit/coverage' },
      { type: 'lcovonly', dir: 'reports/test/unit/coverage' },
      { type: 'json', dir: 'reports/test/unit/coverage' },
      { type: 'cobertura', dir: 'reports/test/unit/coverage' }
      ]
    }
  });
};
