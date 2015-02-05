'use strict';

var gutil, prettyHrtime, startTime;

gutil = require('gulp-util');
prettyHrtime = require('pretty-hrtime');

module.exports = {
  start: function(filePath) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filePath) + '...');
  },

  watch: function(bundleName) {
    gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
  },

  end: function(filePath) {
    var taskTime, prettyTime;

    taskTime = process.hrtime(startTime);
    prettyTime = prettyHrtime(taskTime);

    gutil.log('Bundled', gutil.colors.green(filePath), 'in', gutil.colors.magenta(prettyTime));
  }
};
