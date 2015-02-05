'use strict';

var gulp, cleanifyTask;

gulp = require('gulp');

cleanifyTask = function(callback) {
  // Additional cleaning task can be specified here
};

gulp.task('cleanify', ['clean-dist', 'clean-reports'], cleanifyTask);

module.exports = cleanifyTask;
