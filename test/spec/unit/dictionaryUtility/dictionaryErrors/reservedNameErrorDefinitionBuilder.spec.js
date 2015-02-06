'use strict';

var dictionaryErrorsLibrary, reservedNameErrorDefinitionBuilder;

dictionaryErrorsLibrary = require('../../../../locationHelpers/dictionaryErrorsLibrary');

reservedNameErrorDefinitionBuilder = dictionaryErrorsLibrary.reservedNameErrorDefinitionBuilder;

describe('nameExistsErrorDefinitionBuilder', function(){
  var reservedNameErrorDefinition, store, nameValueReserved, nameValueNotReserved, reservedWord;

  beforeAll(function(){
    reservedWord = 'blarg';
    nameValueReserved = { name:reservedWord, value:'bar'};
    nameValueNotReserved = { name:'foo', value:'other'};
    store = {
      dictionaryName: 'test'
    };

    reservedNameErrorDefinition = reservedNameErrorDefinitionBuilder.build(store);
    reservedNameErrorDefinition.addReservedName(reservedWord);
  });

  it('should contain the correct errorName', function() {
    expect(reservedNameErrorDefinition.errorName).toMatch('nameReserved');
  });

  it('should return true when errorCondition is called with a namevalue whos name is a reserved word added by function addReservedWord', function(){
    var results = reservedNameErrorDefinition.errorCondition(nameValueReserved);
    expect(results).toBe(true);
  });

  it('should return false when errorCondition is called with a namevalue whos name is not a reserved word added by function addReservedWord', function(){
    var results = reservedNameErrorDefinition.errorCondition(nameValueNotReserved);
    expect(results).toBe(false);
  });

  it('should return an string reflecting the correct error', function() {
    var results = reservedNameErrorDefinition.errorBuilder(nameValueReserved);

    expect(results).toMatch('name "'+reservedWord+'" is reserved for '+ store.dictionaryName+' dictionary');
  });
});
