(function(window, Builder) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(Builder);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = Builder();
  } else {
    // Browser Global (dictionary is your global library identifier)
    window.dictionary = Builder();
  }
}(this, function() {
  var require, itemToExport;

  // this is the what is defined in browserify's "entry" item in the configBundles array.
  // located in gulp/config.js under "browserify"
  itemToExport = 1;

  require = (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var storeManagerBuilder, dictionaryBuilder, buildDictionary;

storeManagerBuilder = require('./dictionaryUtility/store/storeManagerBuilder');
dictionaryBuilder = require('./dictionaryUtility/dictionaryBuilder');

buildDictionary = function(options) {
  var store, getValueKey;

  options.reservedNames = options.reservedNames ? options.reservedNames : [];

  getValueKey = options.valueKeyFunction || function(nameValue) {
    return nameValue.value;
  };

  store = storeManagerBuilder.build({
    getValueKey: getValueKey
  });

  options.reservedNames.forEach(store.addReservedName);

  return dictionaryBuilder.build(store);
};

module.exports = {
  build: buildDictionary
};

},{"./dictionaryUtility/dictionaryBuilder":2,"./dictionaryUtility/store/storeManagerBuilder":11}],2:[function(require,module,exports){
'use strict';

function buildDictionary(store) {
  var dictionary = Object.create(store.data.nameValueMap);

  dictionary.$add = store.add;

  return dictionary;
}

module.exports = {
  build: buildDictionary
};

},{}],3:[function(require,module,exports){
'use strict';

var nameExistsErrorDefinitionBuilder, valueExistsErrorDefinitionBuilder, reservedNameErrorDefinitionBuilder;

nameExistsErrorDefinitionBuilder = require('./dictionaryErrors/nameExistsErrorDefinitionBuilder');
valueExistsErrorDefinitionBuilder = require('./dictionaryErrors/valueExistsErrorDefinitionBuilder');
reservedNameErrorDefinitionBuilder = require('./dictionaryErrors/reservedNameErrorDefinitionBuilder');

function addErrorHandling(options) {
  var errorHandling, reservedNameErrorDefinition;

  reservedNameErrorDefinition = reservedNameErrorDefinitionBuilder.build(options.store);

  errorHandling = options.errorHandling;
  errorHandling.addErrorDefinition(nameExistsErrorDefinitionBuilder.build(options.store));
  errorHandling.addErrorDefinition(valueExistsErrorDefinitionBuilder.build(options.store));
  errorHandling.addErrorDefinition(reservedNameErrorDefinition);

  errorHandling.addReservedName = reservedNameErrorDefinition.addReservedName;
}

module.exports = {
  addErrorHandling: addErrorHandling
};

},{"./dictionaryErrors/nameExistsErrorDefinitionBuilder":4,"./dictionaryErrors/reservedNameErrorDefinitionBuilder":5,"./dictionaryErrors/valueExistsErrorDefinitionBuilder":6}],4:[function(require,module,exports){
'use strict';

var stringFormatter, nameExistsError;

stringFormatter = require('../../stringFormatter');

nameExistsError = 'name "{name}" is already in use, value is {value}';

function buildNameExistsError(nameValue, store) {
  var errorText = stringFormatter.format(nameExistsError,
  {
    name: nameValue.name,
    value: store.getValueKey(nameValue)
  });

  return new Error(errorText);
}

function nameExistsErrorCondition(nameValue, store) {
  return !!store.nameValueMap[nameValue.name];
}

function buildValueExistsErrorDefinition (store) {
  return {
    errorName: 'nameExists',
    errorCondition: function(nameValue) { return nameExistsErrorCondition(nameValue, store); },
    errorBuilder: function(nameValue) { return buildNameExistsError(nameValue, store); }
  };
}

module.exports = {
  build: buildValueExistsErrorDefinition
};

},{"../../stringFormatter":12}],5:[function(require,module,exports){
'use strict';

var stringFormatter, nameExistsError;

stringFormatter = require('../../stringFormatter');

nameExistsError = 'name "{name}" is reserved for {type} constants dictionary';

function buildNameReservedError(nameValue, store) {
  var errorText = stringFormatter.format(nameExistsError,
  {
    name: nameValue.name,
    type: store.dictionaryName
  });

  return new Error(errorText);
}

function nameReservedErrorCondition(nameValue, reservedNames) {
  return !!reservedNames[nameValue.name];
}

function addReservedName(name, reservedNames) {
  reservedNames[name] = true;
}

function buildReservedNameErrorDefinition (store) {
  var reservedNames = {};

  return {
    errorName: 'nameReserved',
    errorCondition: function(nameValue) { return nameReservedErrorCondition(nameValue, reservedNames); },
    errorBuilder: function(nameValue) { return buildNameReservedError(nameValue, store); },
    addReservedName: function(name) { addReservedName(name, reservedNames); }
  };
}

module.exports = {
  build: buildReservedNameErrorDefinition
};

},{"../../stringFormatter":12}],6:[function(require,module,exports){
'use strict';

var stringFormatter, valueExistsErrorText;

stringFormatter = require('../../stringFormatter');

valueExistsErrorText = 'given name {givenName} with a value of "{value}" already exists with a name of "{name}"';

function buildValueExistsError(nameValue, store) {
  var errorText = stringFormatter.format(valueExistsErrorText,
  {
    givenName: nameValue.name,
    name: store.valueNameMap[store.getValueKey(nameValue)],
    value: store.getValueKey(nameValue)
  });

  return new Error(errorText);
}

function valueExistsErrorCondition(nameValue, store) {
  return !!store.valueNameMap[nameValue.value];
}

function buildValueExistsErrorDefinition (store) {
  return {
    errorName: 'valueExists',
    errorCondition: function(nameValue) { return valueExistsErrorCondition(nameValue, store); },
    errorBuilder: function(nameValue) { return buildValueExistsError(nameValue, store); }
  };
}

module.exports = {
  build: buildValueExistsErrorDefinition
};

},{"../../stringFormatter":12}],7:[function(require,module,exports){
'use strict';

function throwRelevantError(errorValue, errorDefinitions) {
  errorDefinitions.forEach(function (errorDefinition){
    if(errorDefinition.condition(errorValue)) {
      throw new Error(errorDefinition.buildError(errorValue));
    }
  });
}

function addErrorDefinition(errorDefinition, errorDefinitions) {
  errorDefinitions.push({
    condition: errorDefinition.errorCondition,
    buildError: errorDefinition.errorBuilder
  });
}

function buildErrorHandling(){
  var errorHandling = {
    errorDefinitions: [],
    addErrorDefinition: function(errorDefinition){ addErrorDefinition( errorDefinition, errorHandling.errorDefinitions); },
    throwRelevantError: function(errorValue) { throwRelevantError(errorValue, errorHandling.errorDefinitions);}
  };

  return errorHandling;
}

module.exports = {
  build: buildErrorHandling
};

},{}],8:[function(require,module,exports){
'use strict';

var errorHandlingBuilder, dictionaryErrorHandling;

errorHandlingBuilder = require('../errorHandlingBuilder');
dictionaryErrorHandling = require('../dictionaryErrorHandling');

function addErrorHandling(options) {
  var errorHandling = errorHandlingBuilder.build();

  dictionaryErrorHandling.addErrorHandling({
    store: options.store,
    constantsObjectName: options.constantsObjectName,
    errorHandling: errorHandling
  });

  options.store.errorHandling = errorHandling;

  return options.store;
}

module.exports = {
  addToStore: addErrorHandling
};

},{"../dictionaryErrorHandling":3,"../errorHandlingBuilder":7}],9:[function(require,module,exports){
'use strict';

var storeErrorHandlingManager;

storeErrorHandlingManager = require('./errorHandlingManager');

function buildDataStore(options) {
  var storeBase;

  storeBase = {
    dictionaryName: options.dictionaryName,
    nameValueMap: {},
    valueNameMap: {},
    getValueKey: options.getValueKey
  };

  storeBase = storeErrorHandlingManager.addToStore({
    store: storeBase,
    errorHandling: storeBase.errorHandling
  });

  storeBase.errorHandling.addReservedName('$add');

  return storeBase;
}

module.exports = {
  build: buildDataStore
};

},{"./errorHandlingManager":8}],10:[function(require,module,exports){
'use strict';

function addSingle(nameValue, store) {
  var nameValueMap, valueNameMap;

  nameValueMap = store.nameValueMap;
  valueNameMap = store.valueNameMap;

  nameValueMap[nameValue.name] = nameValue.value;
  valueNameMap[store.getValueKey(nameValue)] = nameValue.name;
}

function checkAddSingle(options) {
  options.errorHandling.throwRelevantError(options.nameValue);
  addSingle(options.nameValue, options.store);
}

function addAll(nameValues, store) {
  var keys;

  keys = Object.keys(nameValues);

  keys.forEach(function(name) {
    checkAddSingle({
      errorHandling: store.errorHandling,
      store: store,
      nameValue: { name: name, value: nameValues[name]}
    });
  });

}

module.exports = {
  addAll: addAll,
  addSingle: addSingle
};

},{}],11:[function(require,module,exports){
'use strict';

var storeBuilder, storeManagement;

storeBuilder = require('./storeBuilder');
storeManagement = require('./storeManagement');

function addPropertyErrorHandling(options) {
  Object.defineProperty(options.store,
    'errorHandling',
    {
      enumerable: false,
      configurable: false,
      get: function() { return options.storeBase.errorHandling; }
    });
}

function addPropertyAddReservedName(options) {
  Object.defineProperty(options.store,
    'addReservedName',
    {
      enumerable: false,
      configurable: false,
      get: function() { return options.storeBase.errorHandling.addReservedName; }
    });
}

function addProperties(options) {
  addPropertyErrorHandling(options);
  addPropertyAddReservedName(options);
}

function createStore(storeBase) {
  var store;

  store = {
    add: function(nameValues) { storeManagement.addAll(nameValues, storeBase); },
    data: storeBase
  };

  return store;
}

function buildstoreManager(options) {
  var storeBase, store;

  storeBase = storeBuilder.build(options);
  store = createStore(storeBase);

  addProperties({
    store: store,
    storeBase: storeBase
  });

  return store;
}

module.exports = {
  build: buildstoreManager
};

},{"./storeBuilder":9,"./storeManagement":10}],12:[function(require,module,exports){
'use strict';

/*
example:
var format = 'this is test {testGiven} for a showing how to use {name}';
var formattedString = format(fomat, {
  testGiven: 'stringFormatter',
  name: 'format'
});
 */

//TODO: Evaluate if there is a need to pull this into it's own library? Perhaps if we get more utility functions
function format(stringToFormat, values) {
  return stringToFormat.replace(/{(\w+)}/g, function(match, value) {
    return (values[value] !== undefined) ? values[value] : match;
  });
}

module.exports = {
  format: format
};

},{}]},{},[1]);

//# sourceMappingURL=dictionary.js.map;

  return require(itemToExport);
}));