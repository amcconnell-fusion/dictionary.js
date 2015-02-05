'use strict';

describe('errorHandlingBuilder', function(){
  var errorHandlingBuilder, errorHandling, fakeErrorDefinitionSuccess, fakeErrorDefinitionFail, results;

  beforeAll(function(){
    errorHandlingBuilder = require('../../../../src/dictionaryUtility/errorHandlingBuilder');
    errorHandling = errorHandlingBuilder.build();

    results = {
      conditionChecked: {},
      buildErrorCalled: {}
    };

    fakeErrorDefinitionSuccess = {
      errorCondition: function(given) {
        results.conditionChecked.fakeErrorDefinitionSuccess = given;
        return true;
      },
      errorBuilder: function(given) {
        results.buildErrorCalled.fakeErrorDefinitionSuccess = given;
        return 'fakeErrorDefinitionSuccess';
      }
    };

    fakeErrorDefinitionFail = {
      errorCondition: function(given) {
        results.conditionChecked.fakeErrorDefinitionFail = given;
        return false;
      },
      errorBuilder: function(given) {
        results.buildErrorCalled.fakeErrorDefinitionFail = given;
        return 'fakeErrorDefinitionFail';
      }
    };

    errorHandling.addErrorDefinition(fakeErrorDefinitionSuccess);
    errorHandling.addErrorDefinition(fakeErrorDefinitionFail);

  });

  it('should return an object that has an array called errorDefinitions', function(){
    expect(Array.isArray(errorHandling.errorDefinitions)).toBe(true);
  });

  it('should return an object with the function addErrorDefinition that adds to errorDefinitions', function(){
    expect(errorHandling.errorDefinitions.length).toEqual(2);
    expect(errorHandling.errorDefinitions[0].condition).toBe(fakeErrorDefinitionSuccess.errorCondition);
    expect(errorHandling.errorDefinitions[0].buildError).toBe(fakeErrorDefinitionSuccess.errorBuilder);
    expect(errorHandling.errorDefinitions[1].condition).toBe(fakeErrorDefinitionFail.errorCondition);
    expect(errorHandling.errorDefinitions[1].buildError).toBe(fakeErrorDefinitionFail.errorBuilder);
  });

  it('should throw the correct error when it calls throwRelevantError', function() {
    var givenInfo = {
      name: 'foo'
    };
    expect(function(){errorHandling.throwRelevantError(givenInfo);}).toThrow(new Error('fakeErrorDefinitionSuccess'));
    expect(results.conditionChecked.fakeErrorDefinitionSuccess).toBe(givenInfo);
    expect(results.buildErrorCalled.fakeErrorDefinitionSuccess).toBe(givenInfo);
  });
});
