'use strict';

var sinon, storeLibrary, dictionaryUtilityLibrary, baseLibrary, storeLibrary;

sinon = require('sinon');
baseLibrary = require('../../locationHelpers/baseLibrary');
dictionaryUtilityLibrary = require('../../locationHelpers/dictionaryUtilityLibrary');
storeLibrary = require('../../locationHelpers/storeLibrary');

function buildStoreMock(storeName) {
  var reservedNames = [];
  return {
    name: storeName,
    reservedNames: reservedNames,
    addReservedName: function(name){
      reservedNames.push(name);
    }
  };
}

function runTests(given, mocks){
  //stub
  var results = {
    storeManagerBuilder: {},
    dictionaryBuilder: {}
  };

  sinon.stub(storeLibrary.storeManagerBuilder, 'build', function(options){
    var build = {};
    build.givenOptions = options;

    results.storeManagerBuilder.build = build;
    return mocks.storeManagerBuilder.build;
  });

  sinon.stub(dictionaryUtilityLibrary.dictionaryBuilder, 'build', function(options){
    var build = {};
    build.givenOptions = options;
    results.dictionaryBuilder.build = build;

    return mocks.dictionaryBuilder.build;
  });

  results.dictionary = baseLibrary.dictionary.build(given);

  dictionaryUtilityLibrary.dictionaryBuilder.build.restore();
  storeLibrary.storeManagerBuilder.build.restore();

  return results;
}

describe('dictionary Unit Test', function() {
  var given, results, mocks;

  beforeAll(function(){
    given = {
      withoutGetItem: {
        reservedNames: ['foo','bar','other']
      },
      withGetItem: {
        reservedNames: ['foo','bar'],
        valueKeyFunction: function() {
          return 'customStuff';
        }
      }

    };
    results = {};
    mocks = {
      withoutGetItem: {
        dictionaryBuilder: {
          build: {
            name: 'withGetItemDictionary'
          }
        },
        storeManagerBuilder: {
          build: buildStoreMock('withoutGetItemStoreManager')
        }
      },
      withGetItem: {
        dictionaryBuilder: {
          build: {
            name: 'withGetItemDictionary'
          }
        },
        storeManagerBuilder: {
          build: buildStoreMock('withGetItemStoreManager')
        }
      }
    };

    results.withoutGetItem = runTests(given.withoutGetItem, mocks.withoutGetItem);
    results.withGetItem = runTests(given.withGetItem, mocks.withGetItem);
  });

  it('should return a dictionary returned from dictionaryBuilder', function() {
    expect(results.withGetItem.dictionary).toBe(mocks.withGetItem.dictionaryBuilder.build);
    expect(results.withoutGetItem.dictionary).toBe(mocks.withoutGetItem.dictionaryBuilder.build);
  });

  it('should pass in the store returned from storeManagerBuilder to dictionaryBuilder', function() {
    expect(results.withGetItem.dictionaryBuilder.givenOptions).toBe(mocks.withGetItem.storeManagerBuilder.store);
    expect(results.withoutGetItem.dictionaryBuilder.givenOptions).toBe(mocks.withoutGetItem.storeManagerBuilder.store);
  });

  it('should add all reservedNames passed in', function() {

    var tests = ['withGetItem', 'withoutGetItem'];

    tests.forEach(function(testName){
      var testGiven, testStore;
      testGiven = given[testName];
      testStore = mocks[testName].storeManagerBuilder.build;

      expect(testStore.reservedNames.length).toEqual(testGiven.reservedNames.length);
      testGiven.reservedNames.forEach(function(item){
        expect(testStore.reservedNames).toContain(item);
      });
    });
  });

  it('should use a default getItemValue that returns the value for the name if getItemValue is not specified', function(){
    var getItemValue = results.withoutGetItem.storeManagerBuilder.build.givenOptions.getValueKey;
    expect(getItemValue({name:'foo', value:'bar'})).toMatch('bar');
  });

  it('should use getItemValue given in options', function() {
    var getItemValue = results.withGetItem.storeManagerBuilder.build.givenOptions.getValueKey;
    expect(getItemValue).toBe(given.withGetItem.valueKeyFunction);
  });

});
