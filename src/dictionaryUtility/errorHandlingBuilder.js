'use strict';

function throwRelevantError(errorValue, errorDefinitions) {
  errorDefinitions.forEach(function (errorDefinition){
    if(errorDefinition.condition(errorValue)) {
      throw new Error(errorDefinition.buildError(errorValue));
    }
  });
}

function addErrorDefinition(errorDefinition, errorDefinitions) {
  errorDefinitions.push({
    condition: errorDefinition.errorCondition,
    buildError: errorDefinition.errorBuilder
  });
}

function buildErrorHandling(){
  var errorHandling = {
    errorDefinitions: [],
    addErrorDefinition: function(errorDefinition){ addErrorDefinition( errorDefinition, errorHandling.errorDefinitions); },
    throwRelevantError: function(errorValue) { throwRelevantError(errorValue, errorHandling.errorDefinitions);}
  };

  return errorHandling;
}

module.exports = {
  build: buildErrorHandling
};
