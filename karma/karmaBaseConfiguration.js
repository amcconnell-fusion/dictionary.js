'use strict';

// we do this to have a starting place, it returns a new object each time, so we don't
// have to call Object.create and run into potential issues where they loop over options
// and use object.hasOwnProperty, or have someone accidentally modify the base config.
function getConfiguration(configItems) {
  var item, baseConfig;
  baseConfig =  {
    singleRun: true,
    exclude: ['src/_*.js']
  };

  for(item in configItems) {
    if(configItems.hasOwnProperty(item)){
      baseConfig[item] = configItems[item];
    }
  }

  return baseConfig;
}

module.exports = {
  getConfiguration: getConfiguration
};
