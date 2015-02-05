'use strict';

var storeBuilder, storeManagement;

storeBuilder = require('./storeBuilder');
storeManagement = require('./storeManagement');

function addPropertyErrorHandling(options) {
  Object.defineProperty(options.store,
    'errorHandling',
    {
      enumerable: false,
      configurable: false,
      get: function() { return options.storeBase.errorHandling; }
    });
}

function addPropertyAddReservedName(options) {
  Object.defineProperty(options.store,
    'addReservedName',
    {
      enumerable: false,
      configurable: false,
      get: function() { return options.storeBase.errorHandling.addReservedName; }
    });
}

function addProperties(options) {
  addPropertyErrorHandling(options);
  addPropertyAddReservedName(options);
}

function createStore(storeBase) {
  var store;

  store = {
    add: function(nameValues) { storeManagement.addAll(nameValues, storeBase); },
    data: storeBase
  };

  return store;
}

function buildstoreManager(options) {
  var storeBase, store;

  storeBase = storeBuilder.build(options);
  store = createStore(storeBase);

  addProperties({
    store: store,
    storeBase: storeBase
  });

  return store;
}

module.exports = {
  build: buildstoreManager
};
