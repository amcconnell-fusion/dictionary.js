'use strict';

var stringFormatter, nameExistsError;

stringFormatter = require('../../stringFormatter');

nameExistsError = 'name "{name}" is already in use, value is {value}';

function buildNameExistsError(nameValue, store) {
  var errorText = stringFormatter.format(nameExistsError,
  {
    name: nameValue.name,
    value: store.getValueKey(nameValue)
  });

  return new Error(errorText);
}

function nameExistsErrorCondition(nameValue, store) {
  return !!store.nameValueMap[nameValue.name];
}

function buildValueExistsErrorDefinition (store) {
  return {
    errorName: 'nameExists',
    errorCondition: function(nameValue) { return nameExistsErrorCondition(nameValue, store); },
    errorBuilder: function(nameValue) { return buildNameExistsError(nameValue, store); }
  };
}

module.exports = {
  build: buildValueExistsErrorDefinition
};
