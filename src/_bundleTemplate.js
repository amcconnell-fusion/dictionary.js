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

  require = <%= contents %>;

  return require(itemToExport);
}));
