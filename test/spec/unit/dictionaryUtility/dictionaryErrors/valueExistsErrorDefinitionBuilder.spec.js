'use strict';
var valueExistsErrorDefinitionBuilder = require('../../../../../src/dictionaryUtility/dictionaryErrors/valueExistsErrorDefinitionBuilder');

describe('valueExistsErrorDefinitionBuilder', function(){
  var valueExistsErrorDefinition, store, nameValueGiven, nameValueMock;

  beforeAll(function(){
    nameValueGiven = { name:'foo', value:'bar'};
    nameValueMock = { name:'other', value:'bar'};
    store = {
      valueNameMap: {},
      getValueKey: function(nameValue) {
        return nameValue.value;
      }
    };

    store.valueNameMap[nameValueGiven.value] = nameValueGiven.name;

    valueExistsErrorDefinition = valueExistsErrorDefinitionBuilder.build(store);
  });

  it('should contain the correct errorName', function() {
    expect(valueExistsErrorDefinition.errorName).toMatch('valueExists');
  });

  it('should return true when errorCondition is called with a given nameValues value that exists in valueNameMap', function(){
    var sameNameValue = valueExistsErrorDefinition.errorCondition(nameValueGiven);
    var nameValueWithSameValue = valueExistsErrorDefinition.errorCondition(nameValueMock);

    expect(sameNameValue).toEqual(true);
    expect(nameValueWithSameValue).toEqual(true);
  });

  it('should return false when errorCondition is called with a given nameValues value that does not exist in valueNameMap', function(){
    var results = valueExistsErrorDefinition.errorCondition({value: 'doesntExist'});
    expect(results).toEqual(false);
  });

  it('should return an string reflecting the correct error', function() {
    var results = valueExistsErrorDefinition.errorBuilder(nameValueMock);
    var expected = 'given name ';
    expected += nameValueMock.name;
    expected += ' with a value of "';
    expected += nameValueMock.value;
    expected += '" already exists with a name of "';
    expected += nameValueGiven.name;
    expected += '"';

    expect(results).toMatch(expected);
  });
});
