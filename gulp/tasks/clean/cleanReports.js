'use strict';

var gulp,del, config, cleanReportsTask;

gulp = require('gulp');
del = require('del');
config = require('../../config').cleaning;

cleanReportsTask = function(done) {
  del([config.reports + '/**'], done);
};

gulp.task('clean-reports', cleanReportsTask);

module.exports = cleanReportsTask;
