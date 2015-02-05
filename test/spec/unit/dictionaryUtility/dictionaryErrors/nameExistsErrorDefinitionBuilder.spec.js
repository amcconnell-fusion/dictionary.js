'use strict';
var nameExistsErrorDefinitionBuilder = require('../../../../../src/dictionaryUtility/dictionaryErrors/nameExistsErrorDefinitionBuilder');

describe('nameExistsErrorDefinitionBuilder', function(){
  var nameExistsErrorDefinition, store, nameValueGiven, nameValueMock;

  beforeAll(function(){
    nameValueGiven = { name:'foo', value:'bar'};
    nameValueMock = { name:'foo', value:'other'};
    store = {
      nameValueMap: {},
      getValueKey: function(nameValue) {
        return nameValue.value;
      }
    };

    store.nameValueMap[nameValueGiven.name] = nameValueGiven.value;

    nameExistsErrorDefinition = nameExistsErrorDefinitionBuilder.build(store);
  });

  it('should contain the correct errorName', function() {
    expect(nameExistsErrorDefinition.errorName).toMatch('nameExists');
  });

  it('should return true when errorCondition is called with a given nameValues name that exists in nameValueMap', function(){
    var sameNameValue = nameExistsErrorDefinition.errorCondition(nameValueGiven);
    var nameValueWithSameName = nameExistsErrorDefinition.errorCondition(nameValueMock);

    expect(sameNameValue).toEqual(true);
    expect(nameValueWithSameName).toEqual(true);
  });

  it('should return false when errorCondition is called with a given nameValues name that does not exist in nameValueMap', function(){
    var results = nameExistsErrorDefinition.errorCondition({name: 'doesntExist'});
    expect(results).toEqual(false);
  });

  it('should return an string reflecting the correct error', function() {
    var results = nameExistsErrorDefinition.errorBuilder(nameValueGiven);

    expect(results).toMatch('name "foo" is already in use, value is bar');
  });
});
