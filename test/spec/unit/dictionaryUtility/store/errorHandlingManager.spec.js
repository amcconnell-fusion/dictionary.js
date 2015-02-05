'use strict';

describe('errorHandlingManager', function(){
  var errorHandlingManager, given, results;

  beforeAll(function(){
    errorHandlingManager = require('../../../../../src/dictionaryUtility/store/errorHandlingManager');
    given = {};
    results = {};

    given = {
      errorHandlingManagerOptions: {
        dictionaryObjectName: 'test',
        store: {}
      }
    };

    results = errorHandlingManager.addToStore(given.errorHandlingManagerOptions);
  });

  it('should return options.store', function(){
    expect(results).toBe(given.errorHandlingManagerOptions.store);
  });

  it('should add errorHandling to the store', function(){
    expect(results.errorHandling).not.toBe(undefined);
    expect(Array.isArray(results.errorHandling.errorDefinitions)).toBe(true);
    expect(typeof results.errorHandling.addErrorDefinition).toMatch('function');
    expect(typeof results.errorHandling.throwRelevantError).toMatch('function');
  });
});
