'use strict';

function addSingle(nameValue, store) {
  var nameValueMap, valueNameMap;

  nameValueMap = store.nameValueMap;
  valueNameMap = store.valueNameMap;

  nameValueMap[nameValue.name] = nameValue.value;
  valueNameMap[store.getValueKey(nameValue)] = nameValue.name;
}

function checkAddSingle(options) {
  options.errorHandling.throwRelevantError(options.nameValue);
  addSingle(options.nameValue, options.store);
}

function addAll(nameValues, store) {
  var keys;

  keys = Object.keys(nameValues);

  keys.forEach(function(name) {
    checkAddSingle({
      errorHandling: store.errorHandling,
      store: store,
      nameValue: { name: name, value: nameValues[name]}
    });
  });

}

module.exports = {
  addAll: addAll,
  addSingle: addSingle
};
