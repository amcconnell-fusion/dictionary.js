'use strict';

function modifyConfiguration(config) {

  if(config.exclude === undefined) {
    config.exclude = [];
  }

  config.exclude.push('test/spec/integration/**/*.js');

  return config;
}

module.exports = {
  modifyConfiguration: modifyConfiguration
};
