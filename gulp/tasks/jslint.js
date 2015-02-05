'use strict';

var gulp, jshint, handleErrors, config, lintTask;

gulp = require('gulp');
jshint = require('gulp-jshint');
handleErrors = require('../util/handleErrors');
config = require('../config').linter;

console.log(config.src);
lintTask = function() {
  return gulp.src(config.files)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'))
  .on('error', handleErrors);
};

gulp.task('jslint', lintTask);

module.exports = lintTask;
