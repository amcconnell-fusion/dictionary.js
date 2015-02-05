'use strict';

var gulp = require('gulp');

gulp.task('default', ['cleanify', 'jslint', 'karma', 'complexity', 'watch']);
