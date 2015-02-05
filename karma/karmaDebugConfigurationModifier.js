'use strict';

function modifyConfiguration(baseConfiguration){

  if(baseConfiguration.flags === undefined) {
    baseConfiguration.flags = [];
  }

  baseConfiguration.singleRun = false;
  baseConfiguration.flags.push('-- debug');
  baseConfiguration.browsers = ['Chrome'];

  return baseConfiguration;
}

module.exports = {
  modifyConfiguration: modifyConfiguration
};
