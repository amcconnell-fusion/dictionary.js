'use strict';

var gulp, testRunnerBuilder, unitTestModifier, integrationTestModifier, debugModifier, allBrowsersModifier;

integrationTestModifier = require('../../karma/karmaIntegrationTestConfigurationModifier');
unitTestModifier = require('../../karma/karmaUnitTestsConfigurationModifier');
debugModifier = require('../../karma/karmaDebugConfigurationModifier');
allBrowsersModifier = require('../../karma/karmaAllBrowsersConfigurationModifier');

gulp = require('gulp');
testRunnerBuilder  = require('./karma/testRunnerBuilder');

gulp.task('karma', testRunnerBuilder.buildTestRunner([unitTestModifier]));
gulp.task('karma:watch', testRunnerBuilder.buildTestRunner([unitTestModifier]));

gulp.task('karma:all', testRunnerBuilder.buildTestRunner([]));
gulp.task('karma:all:debug', testRunnerBuilder.buildTestRunner([debugModifier]));
gulp.task('karma:all:allBrowsers', testRunnerBuilder.buildTestRunner([allBrowsersModifier]));

gulp.task('karma:unitTests', testRunnerBuilder.buildTestRunner([unitTestModifier]));
gulp.task('karma:unitTests:debug', testRunnerBuilder.buildTestRunner([unitTestModifier, debugModifier]));
gulp.task('karma:unitTests:allBrowsers', testRunnerBuilder.buildTestRunner([unitTestModifier, allBrowsersModifier]));


gulp.task('karma:integrationTests', testRunnerBuilder.buildTestRunner([integrationTestModifier]));
gulp.task('karma:integrationTests:debug', testRunnerBuilder.buildTestRunner([integrationTestModifier, debugModifier]));
gulp.task('karma:integrationTests:allBrowsers', testRunnerBuilder.buildTestRunner([integrationTestModifier, allBrowsersModifier]));

module.exports = {
  karama: testRunnerBuilder.buildTestRunner([unitTestModifier]),
  karamWatch: testRunnerBuilder.buildTestRunner([unitTestModifier]),
  karmaAll: testRunnerBuilder.buildTestRunner([]),
  karmaAllDebug: testRunnerBuilder.buildTestRunner([debugModifier]),
  karmaAllAllBrowsers: testRunnerBuilder.buildTestRunner([allBrowsersModifier]),
  karmaUnitTests: testRunnerBuilder.buildTestRunner([unitTestModifier]),
  karmaUnitTestsDebug: testRunnerBuilder.buildTestRunner([unitTestModifier, debugModifier]),
  karmaUnitTestsAllBrowsers: testRunnerBuilder.buildTestRunner([unitTestModifier, allBrowsersModifier]),
  karmaIntegrationTests: testRunnerBuilder.buildTestRunner([integrationTestModifier]),
  karmaIntegrationTestsDebug: testRunnerBuilder.buildTestRunner([integrationTestModifier, debugModifier]),
  karmaIntegrationTestsAllBrowsers: testRunnerBuilder.buildTestRunner([integrationTestModifier, allBrowsersModifier])
};
