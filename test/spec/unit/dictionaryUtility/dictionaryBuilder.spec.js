'use strict';

var dictionaryBuilder;

dictionaryBuilder = require('../../../../src/dictionaryUtility/dictionaryBuilder.js');

describe('dictionaryBuilder', function(){
  var dictionary, givenstore;

  beforeAll(function(){
    givenstore = {
      data: {
        nameValueMap: {
          isOriginal: 'yes.'
        }
      },
      add: function(){
        return 'add test succeeded';
      }
    };

    dictionary = dictionaryBuilder.build(givenstore);
  });

  it('should build an object that contains properties of givenstore.data.nameValueMap', function() {
    expect(dictionary.isOriginal).toMatch(givenstore.data.nameValueMap.isOriginal);
  });

  it('should contain the add function as its own property', function() {
    expect(dictionary.hasOwnProperty('$add')).toBe(true);
  });

  it('should contain the same add function as the given store object', function(){
    expect(dictionary.$add).toBe(givenstore.add);
  });
});
