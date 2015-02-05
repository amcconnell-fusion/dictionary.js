'use strict';

var gulp,del, config, cleanDistTask;

gulp = require('gulp');
del = require('del');
config = require('../../config').cleaning;

cleanDistTask = function(done) {
  del([config.dist + '/**'], done);
};

gulp.task('clean-dist', cleanDistTask);

module.exports = cleanDistTask;
