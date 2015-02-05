'use strict';

var baseConfig, config, karma,path;

baseConfig = require('../../../karma/karmaBaseConfiguration');
config = require('../../config').karma;
karma = require('karma').server;
path = require('path');

function getBaseConfiguration() {
  var karmaConfig = baseConfig.getConfiguration(config);

  return karmaConfig;
}

function modifyConfig(configurationDefinition) {
  var i;

  for(i = 0; i < configurationDefinition.modifiers.length; i +=1) {
    configurationDefinition.baseConfig = configurationDefinition.modifiers[i].modifyConfiguration(configurationDefinition.baseConfig);
  }

  return configurationDefinition.baseConfig;
}

function buildTestRunner(modifiers) {
  var karmaConfig;

  karmaConfig = getBaseConfiguration();

  karmaConfig = modifyConfig({
    baseConfig: karmaConfig,
    modifiers: modifiers
  });

  return function(done) {

    process.env.NODE_PATH = path.normalize(path.join(
      __dirname, '../../../node_modules/')) + ':' +
      path.normalize(path.join(__dirname, '../../../src/'));

    karma.start(karmaConfig, done);
  };
}


module.exports = {
  buildTestRunner: buildTestRunner
};
