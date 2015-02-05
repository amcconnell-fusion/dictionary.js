'use strict';

var browserify, browserifyTask, browserSync, watchify, bundleLogger, gulp, handleErrors, source, buffer, sourcemaps, config, wrap;

browserify = require('browserify');
browserSync = require('browser-sync');
watchify = require('watchify');
bundleLogger = require('../util/bundleLogger');
gulp = require('gulp');
handleErrors = require('../util/handleErrors');
sourcemaps = require('gulp-sourcemaps');
source = require('vinyl-source-stream');
buffer = require('vinyl-buffer');
config = require('../config').browserify;
wrap = require('gulp-wrap');

browserifyTask = function(callback, devMode) {
  var bundleQueue, browserifyThis;

  bundleQueue = config.bundleConfigs.length;
  browserifyThis = function(bundleConfig) {
    var browserifyLoader, bundle, reportFinished;

    if (devMode) {
      _.extend(bundleConfig, watchify.args, { debug: true });
      bundleConfig = _.omit(bundleConfig, ['external', 'require']);
    }

    browserifyLoader = browserify(bundleConfig);

    bundle = function() {
      bundleLogger.start(bundleConfig.outputName);

      return browserifyLoader.bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(wrap({ src: bundleConfig.template }))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished)
        .pipe(browserSync.reload({stream:true}));
    };

    if (devMode) {

      browserifyLoader = watchify(browserifyLoader);
      browserifyLoader.on('update', bundle);
      bundleLogger.watch(bundleConfig.outputName);
    } else {
      if(bundleConfig.require) {
        browserifyLoader.require(bundleConfig.require);
      }

      if(bundleConfig.external) {
        browserifyLoader.external(bundleConfig.external);
      }
    }

    reportFinished = function() {
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;

        if (bundleQueue === 0) {
          callback();
        }
      }
    };

    return bundle();
  };

  config.bundleConfigs.forEach(browserifyThis);
};

gulp.task('browserify', browserifyTask);

module.exports = browserifyTask;
