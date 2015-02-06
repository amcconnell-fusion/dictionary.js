'use strict';

var storeLibrary = require('../../../../locationHelpers/storeLibrary');

function createNameValue(name,value) {
  return {
    name: name,
    value: value
  };
}

describe('storeManagement', function() {
  var storeManagement, nameValueSingleTest, nameValueMultiTest, results;
  beforeAll(function() {

    storeManagement = storeLibrary.storeManagement;

    results = {};
    results.singleTest = {
      nameValueMap: {},
      valueNameMap: {},
      getValueKey: function(nameValue) {
        return nameValue.value;
      }
    };
    nameValueSingleTest = createNameValue('foo', 'bar');

    results.multiTest = {
      nameValueMap: {},
      valueNameMap: {},
      getValueKey: function(nameValue) {
        return nameValue.value;
      },
      errorHandling: {
        throwRelevantError: function(item) {
          results.itemsErrorChecked.push(item);
        }
      }
    };

    results.itemsErrorChecked = [];

    nameValueMultiTest = {
      foo: 'foo1',
      bar: 'bar1',
      other: 'other1'
    };

    storeManagement.addSingle(nameValueSingleTest, results.singleTest);
    storeManagement.addAll(nameValueMultiTest, results.multiTest);
  });

  describe('addSingle', function(){
    it('should add a single value to a given name', function(){
      var current, itemCount;
      itemCount = 0;
      for(current in results.singleTest.nameValueMap) {
        itemCount += 1;
      }
      expect(itemCount).toEqual(1);
      expect(results.singleTest.nameValueMap[nameValueSingleTest.name]).toEqual(nameValueSingleTest.value);
    });

    it('should add a single name to a given value', function(){
      var current, itemCount;
      itemCount = 0;
      for(current in results.singleTest.valueNameMap) {
        itemCount += 1;
      }
      expect(itemCount).toEqual(1);
      expect(results.singleTest.valueNameMap[nameValueSingleTest.value]).toEqual(nameValueSingleTest.name);
    });
  });

  describe('addAll', function(){


    it('should add all items to nameValueMap', function() {
      var current, itemCount;
      itemCount = 0;
      for(current in results.multiTest.nameValueMap) {
        itemCount += 1;
      }

      expect(itemCount).toEqual(3);
      expect(results.multiTest.nameValueMap.foo).toEqual('foo1');
      expect(results.multiTest.nameValueMap.bar).toEqual('bar1');
      expect(results.multiTest.nameValueMap.other).toEqual('other1');
    });

    it('should add all items to valueNameMap', function(){
      var current, itemCount;
      itemCount = 0;
      for(current in results.multiTest.valueNameMap) {
        itemCount += 1;
      }

      expect(itemCount).toEqual(3);
      expect(results.multiTest.valueNameMap.foo1).toEqual('foo');
      expect(results.multiTest.valueNameMap.bar1).toEqual('bar');
      expect(results.multiTest.valueNameMap.other1).toEqual('other');
    });

    it('should check for errors on each item added', function(){
      expect(results.itemsErrorChecked.length).toEqual(3);
      expect(results.itemsErrorChecked[0].name).toEqual('foo');
      expect(results.itemsErrorChecked[0].value).toEqual('foo1');
      expect(results.itemsErrorChecked[1].name).toEqual('bar');
      expect(results.itemsErrorChecked[1].value).toEqual('bar1');
      expect(results.itemsErrorChecked[2].name).toEqual('other');
      expect(results.itemsErrorChecked[2].value).toEqual('other1');
    });


  });

});
