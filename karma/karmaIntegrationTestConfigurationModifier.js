'use strict';

function modifyConfiguration(config){

  if(config.exclude === undefined) {
    config.exclude = [];
  }

  config.exclude.push('test/spec/unit/**/*.js');

  return config;
}

module.exports = {
  modifyConfiguration: modifyConfiguration
};
