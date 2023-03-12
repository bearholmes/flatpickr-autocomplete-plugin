function autocompletePlugin() {
  return function (fp) {
    return {
      onReady: function () {
        setTimeout(function () {
          var els = ['autocomplete', 'aria-autocomplete'];
          for (var i = 0; i < els.length; i++) {
            var value = fp.input.getAttribute(els[i]);
            if (value) {
              var name = els[i];
              fp.input.removeAttribute(name);
              if (fp.mobileInput) {
                fp.mobileInput.setAttribute(name, value);
              } else if (fp.altInput) {
                fp.altInput.setAttribute(name, value);
              }
            }
          }
          fp.loadedPlugins.push('autocompletePlugin');
        }, 10);
      },
    };
  };
}
export default autocompletePlugin;
