'use strict';

var nameExistsErrorDefinitionBuilder, valueExistsErrorDefinitionBuilder, reservedNameErrorDefinitionBuilder;

nameExistsErrorDefinitionBuilder = require('./dictionaryErrors/nameExistsErrorDefinitionBuilder');
valueExistsErrorDefinitionBuilder = require('./dictionaryErrors/valueExistsErrorDefinitionBuilder');
reservedNameErrorDefinitionBuilder = require('./dictionaryErrors/reservedNameErrorDefinitionBuilder');

function addErrorHandling(options) {
  var errorHandling, reservedNameErrorDefinition;

  reservedNameErrorDefinition = reservedNameErrorDefinitionBuilder.build(options.store);

  errorHandling = options.errorHandling;
  errorHandling.addErrorDefinition(nameExistsErrorDefinitionBuilder.build(options.store));
  errorHandling.addErrorDefinition(valueExistsErrorDefinitionBuilder.build(options.store));
  errorHandling.addErrorDefinition(reservedNameErrorDefinition);

  errorHandling.addReservedName = reservedNameErrorDefinition.addReservedName;
}

module.exports = {
  addErrorHandling: addErrorHandling
};
