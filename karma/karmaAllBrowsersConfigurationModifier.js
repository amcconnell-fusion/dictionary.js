'use strict';

function modifyConfiguration(config){

  config.browsers = ['PhantomJS', 'Chrome', 'ChromeCanary', 'Firefox', 'Opera', 'IE'];

  return config;
}

module.exports = {
  modifyConfiguration: modifyConfiguration
};
