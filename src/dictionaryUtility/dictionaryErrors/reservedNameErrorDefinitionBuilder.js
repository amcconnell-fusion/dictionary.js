'use strict';

var strings, nameExistsError;

strings = require('strings.js');

nameExistsError = 'name "{name}" is reserved for {type} dictionary';

function buildNameReservedError(nameValue, store) {
  var errorText = strings.format(nameExistsError,
  {
    name: nameValue.name,
    type: store.dictionaryName
  });

  return new Error(errorText);
}

function nameReservedErrorCondition(nameValue, reservedNames) {
  return !!reservedNames[nameValue.name];
}

function addReservedName(name, reservedNames) {
  reservedNames[name] = true;
}

function buildReservedNameErrorDefinition (store) {
  var reservedNames = {};

  return {
    errorName: 'nameReserved',
    errorCondition: function(nameValue) { return nameReservedErrorCondition(nameValue, reservedNames); },
    errorBuilder: function(nameValue) { return buildNameReservedError(nameValue, store); },
    addReservedName: function(name) { addReservedName(name, reservedNames); }
  };
}

module.exports = {
  build: buildReservedNameErrorDefinition
};
