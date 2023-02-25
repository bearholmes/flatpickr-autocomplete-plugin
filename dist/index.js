(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.autocompletePlugin = factory()));
})(this, function () {
  'use strict';
  function autocompletePlugin() {
    return function (fp) {
      return {
        onReady: function () {
          setTimeout(function () {
            var value = fp.input.getAttribute('autocomplete');
            if (!value) return;
            if (fp.mobileInput) {
              fp.input.removeAttribute('autocomplete');
              fp.mobileInput.autocomplete = value;
            } else if (fp.altInput) {
              fp.input.removeAttribute('autocomplete');
              fp.altInput.autocomplete = value;
            }
            fp.loadedPlugins.push('autocompletePlugin');
          }, 10);
        },
      };
    };
  }
  return autocompletePlugin;
});
