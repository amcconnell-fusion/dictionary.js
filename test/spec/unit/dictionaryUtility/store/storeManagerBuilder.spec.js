'use strict';

var sinon = require('sinon');
var storeLibrary = require('../../../../locationHelpers/storeLibrary');

describe('storeManagerBuilder', function(){
  var given, results, mocks;

  beforeAll(function(){
    given = {
      storeBuilderOptions: {
        name: 'test'
      },
      add: {name: 'foo'}
    };
    results = {
      storeBuilder: {},
      storeManagement: {},
      storeManager: {}
    };
    mocks = {
      storeBase: {
        errorHandling: {
          addReservedName: function() { return 'addReseredName'; }
        }
      }
    };

    // store builder, store management
    sinon.stub(storeLibrary.storeBuilder, 'build', function(options){
      results.storeBuilder.givenOptions = options;
      return mocks.storeBase;
    });

    sinon.stub(storeLibrary.storeManagement, 'addAll', function(nameValues, storeBase) {
      results.storeManagement.addAll = {
        nameValues: nameValues,
        storeBase: storeBase
      };
    });

    results.storeManager = storeLibrary.storeManagerBuilder.build(given.storeBuilderOptions);
    results.storeManager.add(given.add);

    storeLibrary.storeBuilder.build.restore();
    storeLibrary.storeManagement.addAll.restore();
  });

  it('should pass options given to storeBuilder', function(){
    expect(results.storeBuilder.givenOptions).toBe(given.storeBuilderOptions);
  });

  it('should create property errorHandling',function() {
    expect(results.storeManager.errorHandling).toBe(mocks.storeBase.errorHandling);
  });

  it('should create property addReservedName', function(){
    var addReservedName = results.storeManager.addReservedName;
    expect(addReservedName).toBe(mocks.storeBase.errorHandling.addReservedName);
  });

  it('should return a store that contain function add', function(){
    expect(typeof results.storeManager.add).toMatch('function');
  });

  it('should call addAll from storeManagement with the correct values', function(){

    expect(results.storeManagement.addAll.nameValues).toBe(given.add);
    expect(results.storeManagement.addAll.storeBase).toBe(mocks.storeBase);
  });
});
