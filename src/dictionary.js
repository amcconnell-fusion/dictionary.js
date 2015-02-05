'use strict';

var storeManagerBuilder, dictionaryBuilder, buildDictionary;

storeManagerBuilder = require('./dictionaryUtility/store/storeManagerBuilder');
dictionaryBuilder = require('./dictionaryUtility/dictionaryBuilder');

buildDictionary = function(options) {
  var store, getValueKey;

  options.reservedNames = options.reservedNames ? options.reservedNames : [];

  getValueKey = options.valueKeyFunction || function(nameValue) {
    return nameValue.value;
  };

  store = storeManagerBuilder.build({
    getValueKey: getValueKey
  });

  options.reservedNames.forEach(store.addReservedName);

  return dictionaryBuilder.build(store);
};

module.exports = {
  build: buildDictionary
};
