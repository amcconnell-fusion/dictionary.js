'use strict';

var gulp, browserifyTask, watchifyTask;

gulp = require('gulp');
browserifyTask = require('browserify');

watchifyTask = function(callback) {
  // Start browserify task with devMode === true
  browserifyTask(callback, true);
};

gulp.task('watchify', watchifyTask);

module.exports = watchifyTask;
