'use strict';

var formatter = require('../../../src/stringFormatter');

describe('String formatter Unit Test', function() {
  it('should return same string when no replacements are made', function() {
    expect(formatter.format('Hello world!')).toEqual('Hello world!');
  });

  it('should return same string when replacements are made', function() {
    expect(formatter.format('Hello {name}!', { name: 'world' })).toEqual('Hello world!');
  });

  it('should return string with no replacements of value is not supplied', function() {
    expect(formatter.format('Hello {name}!', {})).toEqual('Hello {name}!');
  });

  it('should return same string when replacements are made and ignore additonal values', function() {
    expect(formatter.format('Hello {name}!', { name: 'world', greeting: 'Hello' })).toEqual('Hello world!');
  });

  it('should return replaced values when called with multiple replacements', function() {
    expect(formatter.format('{greeting} {name}!', { name: 'world', greeting: 'Hello' })).toEqual('Hello world!');
  });
});
