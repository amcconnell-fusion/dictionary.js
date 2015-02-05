'use strict';

var gulp, config, size, uglify, uglifyTask, pkg, rename;

gulp = require('gulp');
config = require('../config').production;
size = require('gulp-filesize');
uglify = require('gulp-uglify');
rename = require('gulp-rename');
pkg = require('../../package.json');

uglifyTask = function() {
  return gulp.src(config.jsSrc)
  .pipe(uglify())
  .pipe(rename({ suffix: '.' + pkg.version + '.min' }))
  .pipe(gulp.dest(config.dest))
  .pipe(size());
};

gulp.task('uglifyJs', ['browserify'], uglifyTask);

module.exports = uglifyTask;
