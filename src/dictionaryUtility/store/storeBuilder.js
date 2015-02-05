'use strict';

var storeErrorHandlingManager;

storeErrorHandlingManager = require('./errorHandlingManager');

function buildDataStore(options) {
  var storeBase;

  storeBase = {
    dictionaryName: options.dictionaryName,
    nameValueMap: {},
    valueNameMap: {},
    getValueKey: options.getValueKey
  };

  storeBase = storeErrorHandlingManager.addToStore({
    store: storeBase,
    errorHandling: storeBase.errorHandling
  });

  storeBase.errorHandling.addReservedName('$add');

  return storeBase;
}

module.exports = {
  build: buildDataStore
};
