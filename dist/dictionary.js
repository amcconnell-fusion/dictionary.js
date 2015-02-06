(function(window, Builder) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = Builder();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(Builder);
  } else {
    // Browser Global (dictionary is your global library identifier)
    window.dictionary = Builder();
  }
}(this, function() {
  var _dicRq_, itemToExport;

  // this is the what is defined in browserify's "entry" item in the configBundles array.
  // located in gulp/config.js under "browserify"
  itemToExport = 1;

  _dicRq_ = (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dicRq_=="function"&&_dicRq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dicRq_=="function"&&_dicRq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dicRq_,_dcMd_,exports){
'use strict';

var storeManagerBuilder, dictionaryBuilder, buildDictionary;

storeManagerBuilder = _dicRq_('./dictionaryUtility/store/storeManagerBuilder');
dictionaryBuilder = _dicRq_('./dictionaryUtility/dictionaryBuilder');

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

_dcMd_.exports = {
  build: buildDictionary
};

},{"./dictionaryUtility/dictionaryBuilder":3,"./dictionaryUtility/store/storeManagerBuilder":12}],2:[function(_dicRq_,_dcMd_,exports){
(function(window, Builder) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(Builder);
  } else if (typeof exports === 'object') {
    // CommonJS
    _dcMd_.exports = Builder();
  } else {
    // Browser Global (strings is your global library identifier)
    window.strings = Builder();
  }
}(this, function() {
  var _strRq_, itemToExport;

  // this is the what is defined in browserify's "entry" item in the configBundles array.
  // located in gulp/config.js under "browserify"
  itemToExport = 1;

  _strRq_ = (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _strRq_=="function"&&_strRq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _strRq_=="function"&&_strRq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_strRq_,_stMd_,exports){
'use strict';

var formatting = _strRq_('./utilities/formatting');

_stMd_.exports = {
  format: formatting.format
};

},{"./utilities/formatting":2}],2:[function(_strRq_,_stMd_,exports){
'use strict';

function format(stringToFormat, values) {
  return stringToFormat.replace(/{(\w+)}/g, function(match, value) {
    return (values[value] !== undefined) ? values[value] : match;
  });
}

_stMd_.exports = {
  format: format
};

},{}]},{},[1]);

//# sourceMappingURL=strings.js.map;

  return _strRq_(itemToExport);
}));
},{}],3:[function(_dicRq_,_dcMd_,exports){
'use strict';

function buildDictionary(store) {
  var dictionary = Object.create(store.data.nameValueMap);

  dictionary.$add = store.add;

  return dictionary;
}

_dcMd_.exports = {
  build: buildDictionary
};

},{}],4:[function(_dicRq_,_dcMd_,exports){
'use strict';

var nameExistsErrorDefinitionBuilder, valueExistsErrorDefinitionBuilder, reservedNameErrorDefinitionBuilder;

nameExistsErrorDefinitionBuilder = _dicRq_('./dictionaryErrors/nameExistsErrorDefinitionBuilder');
valueExistsErrorDefinitionBuilder = _dicRq_('./dictionaryErrors/valueExistsErrorDefinitionBuilder');
reservedNameErrorDefinitionBuilder = _dicRq_('./dictionaryErrors/reservedNameErrorDefinitionBuilder');

function addErrorHandling(options) {
  var errorHandling, reservedNameErrorDefinition;

  reservedNameErrorDefinition = reservedNameErrorDefinitionBuilder.build(options.store);

  errorHandling = options.errorHandling;
  errorHandling.addErrorDefinition(nameExistsErrorDefinitionBuilder.build(options.store));
  errorHandling.addErrorDefinition(valueExistsErrorDefinitionBuilder.build(options.store));
  errorHandling.addErrorDefinition(reservedNameErrorDefinition);

  errorHandling.addReservedName = reservedNameErrorDefinition.addReservedName;
}

_dcMd_.exports = {
  addErrorHandling: addErrorHandling
};

},{"./dictionaryErrors/nameExistsErrorDefinitionBuilder":5,"./dictionaryErrors/reservedNameErrorDefinitionBuilder":6,"./dictionaryErrors/valueExistsErrorDefinitionBuilder":7}],5:[function(_dicRq_,_dcMd_,exports){
'use strict';

var strings, nameExistsError;

strings = _dicRq_('strings.js');

nameExistsError = 'name "{name}" is already in use, value is {value}';

function buildNameExistsError(nameValue, store) {
  var errorText = strings.format(nameExistsError,
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

_dcMd_.exports = {
  build: buildValueExistsErrorDefinition
};

},{"strings.js":2}],6:[function(_dicRq_,_dcMd_,exports){
'use strict';

var strings, nameExistsError;

strings = _dicRq_('strings.js');

nameExistsError = 'name "{name}" is reserved for {type} dictionary';

function buildNameReservedError(nameValue, store) {
  var errorText = strings.format(nameExistsError,
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

_dcMd_.exports = {
  build: buildReservedNameErrorDefinition
};

},{"strings.js":2}],7:[function(_dicRq_,_dcMd_,exports){
'use strict';

var strings, valueExistsErrorText;

strings = _dicRq_('strings.js');

valueExistsErrorText = 'given name {givenName} with a value of "{value}" already exists with a name of "{name}"';

function buildValueExistsError(nameValue, store) {
  var errorText = strings.format(valueExistsErrorText,
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

_dcMd_.exports = {
  build: buildValueExistsErrorDefinition
};

},{"strings.js":2}],8:[function(_dicRq_,_dcMd_,exports){
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

_dcMd_.exports = {
  build: buildErrorHandling
};

},{}],9:[function(_dicRq_,_dcMd_,exports){
'use strict';

var errorHandlingBuilder, dictionaryErrorHandling;

errorHandlingBuilder = _dicRq_('../errorHandlingBuilder');
dictionaryErrorHandling = _dicRq_('../dictionaryErrorHandling');

function addErrorHandling(options) {
  var errorHandling = errorHandlingBuilder.build();

  dictionaryErrorHandling.addErrorHandling({
    store: options.store,
    dictionaryObjectName: options.dictionaryObjectName,
    errorHandling: errorHandling
  });

  options.store.errorHandling = errorHandling;

  return options.store;
}

_dcMd_.exports = {
  addToStore: addErrorHandling
};

},{"../dictionaryErrorHandling":4,"../errorHandlingBuilder":8}],10:[function(_dicRq_,_dcMd_,exports){
'use strict';

var storeErrorHandlingManager;

storeErrorHandlingManager = _dicRq_('./errorHandlingManager');

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

_dcMd_.exports = {
  build: buildDataStore
};

},{"./errorHandlingManager":9}],11:[function(_dicRq_,_dcMd_,exports){
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

_dcMd_.exports = {
  addAll: addAll,
  addSingle: addSingle
};

},{}],12:[function(_dicRq_,_dcMd_,exports){
'use strict';

var storeBuilder, storeManagement;

storeBuilder = _dicRq_('./storeBuilder');
storeManagement = _dicRq_('./storeManagement');

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

_dcMd_.exports = {
  build: buildstoreManager
};

},{"./storeBuilder":10,"./storeManagement":11}]},{},[1]);

//# sourceMappingURL=dictionary.js.map;

  return _dicRq_(itemToExport);
}));