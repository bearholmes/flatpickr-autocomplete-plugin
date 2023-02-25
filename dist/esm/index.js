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
export default autocompletePlugin;
