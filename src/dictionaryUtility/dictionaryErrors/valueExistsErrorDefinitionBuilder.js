'use strict';

var stringFormatter, valueExistsErrorText;

stringFormatter = require('../../stringFormatter');

valueExistsErrorText = 'given name {givenName} with a value of "{value}" already exists with a name of "{name}"';

function buildValueExistsError(nameValue, store) {
  var errorText = stringFormatter.format(valueExistsErrorText,
  {
    givenName: nameValue.name,
    name: store.valueNameMap[store.getValueKey(nameValue)],
    value: store.getValueKey(nameValue)
  });

  return new Error(errorText);
}

function valueExistsErrorCondition(nameValue, store) {
  return !!store.valueNameMap[nameValue.value];
}

function buildValueExistsErrorDefinition (store) {
  return {
    errorName: 'valueExists',
    errorCondition: function(nameValue) { return valueExistsErrorCondition(nameValue, store); },
    errorBuilder: function(nameValue) { return buildValueExistsError(nameValue, store); }
  };
}

module.exports = {
  build: buildValueExistsErrorDefinition
};
