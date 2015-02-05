'use strict';

var gulp, config, watchify;

gulp = require('gulp');
config = require('../config');
watchify = require('./browserify');

gulp.task('watch', ['watchify','browserSync'], function(callback) {
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
