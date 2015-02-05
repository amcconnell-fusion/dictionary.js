'use strict';

var browserSync, browserSyncTask, gulp, config;

browserSync = require('browser-sync');
gulp = require('gulp');
config = require('../config').browserSync;

browserSyncTask = function() {
  browserSync(config);
};

gulp.task('browserSync', browserSyncTask);

module.exports = browserSyncTask;
