'use strict';
var sinon, storeLibrary;

sinon = require('sinon');
storeLibrary = require('../../../../locationHelpers/storeLibrary');

describe('storeBuilder', function(){
  var given, results, mocks;

  beforeAll(function(){

    given = {
      storeBuilderOptions: {
        dictionaryName: 'test',
        getValueKey: function(item) { return item; }
      }
    };

    mocks = {
      errorHandling: {
        addReservedName: function(value) {results.reserved.push(value);}
      }
    };

    results = {
      reserved: []
    };

    // stub
    sinon.stub(storeLibrary.errorHandlingManager, 'addToStore', function(given){
      results.given = given;
      given.store.errorHandling = mocks.errorHandling;
      return given.store;
    });

    results.store = storeLibrary.storeBuilder.build(given.storeBuilderOptions);

    storeLibrary.errorHandlingManager.addToStore.restore();
  });

  // this is where I could use mocking. I could confirm not only that they are there, but they are the correct object...
  it('should return a store object', function(){
    var store = results.store;
    expect(store).not.toBe(undefined);
    expect(typeof store.nameValueMap).toMatch('object');
    expect(typeof store.valueNameMap).toMatch('object');
    expect(store.dictionaryName).toMatch(given.storeBuilderOptions.dictionaryName);
    expect(store.errorHandling).toBe(mocks.errorHandling);
    expect(store.getValueKey).toBe(given.storeBuilderOptions.getValueKey);
  });

  it('adds $add to the reservedName list', function(){
    expect(results.reserved).toContain('$add');
  });

});
