'use strict';

function buildDictionary(store) {
  var dictionary = Object.create(store.data.nameValueMap);

  dictionary.$add = store.add;

  return dictionary;
}

module.exports = {
  build: buildDictionary
};
