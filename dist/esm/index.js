/**
 * flatpickr-autocomplete-plugin v1.0.4
 * A lightweight flatpickr plugin to control autocomplete attributes on date picker inputs
 *
 * @license MIT
 * @author bearholmes
 * @repository git+https://github.com/bearholmes/flatpickr-autocomplete-plugin.git
 */
/**
 * Autocomplete attribute names to transfer
 */
const AUTOCOMPLETE_ATTRIBUTES = ['autocomplete', 'aria-autocomplete'];
/**
 * Safely transfers an attribute from source element to target element
 *
 * @param sourceElement - The element to read the attribute from
 * @param targetElement - The element to set the attribute on
 * @param attributeName - The name of the attribute to transfer
 * @returns true if the attribute was transferred, false otherwise
 */
function transferAttribute(sourceElement, targetElement, attributeName) {
    if (!targetElement) {
        return false;
    }
    try {
        const value = sourceElement.getAttribute(attributeName);
        if (value !== null) {
            sourceElement.removeAttribute(attributeName);
            targetElement.setAttribute(attributeName, value);
            return true;
        }
    }
    catch (error) {
    }
    return false;
}
/**
 * Gets the target input element where autocomplete attributes should be applied
 *
 * @param fp - The flatpickr instance
 * @returns The target input element (mobileInput or altInput), or undefined
 */
function getTargetInput(fp) {
    return fp.mobileInput || fp.altInput || undefined;
}
/**
 * Processes autocomplete attributes after flatpickr is ready
 *
 * @param fp - The flatpickr instance
 */
function processAutocompleteAttributes(fp) {
    // Ensure the input element exists
    if (!fp.input) {
        return;
    }
    const targetInput = getTargetInput(fp);
    if (!targetInput) {
        // No alternate input to transfer to, skip processing
        return;
    }
    // Transfer each autocomplete attribute
    for (const attribute of AUTOCOMPLETE_ATTRIBUTES) {
        transferAttribute(fp.input, targetInput, attribute);
    }
}
/**
 * Creates a flatpickr plugin that controls autocomplete attributes
 *
 * This plugin transfers `autocomplete` and `aria-autocomplete` attributes
 * from the original input element to flatpickr's mobile or alternate input.
 * This is useful for controlling browser autocomplete behavior on the actual
 * visible input element.
 *
 * @example
 * ```typescript
 * import flatpickr from 'flatpickr';
 * import autocompletePlugin from 'flatpickr-autocomplete-plugin';
 *
 * flatpickr('#myInput', {
 *   plugins: [autocompletePlugin()]
 * });
 * ```
 *
 * @example
 * ```html
 * <!-- In your HTML -->
 * <input
 *   id="myInput"
 *   autocomplete="off"
 *   aria-autocomplete="none"
 * />
 * ```
 *
 * @returns A flatpickr plugin instance
 */
function autocompletePlugin() {
    return (fp) => {
        return {
            /**
             * Hook called when flatpickr is fully initialized
             */
            onReady() {
                // Use requestAnimationFrame to ensure DOM is fully ready
                // This is more reliable than setTimeout and doesn't use arbitrary delays
                requestAnimationFrame(() => {
                    processAutocompleteAttributes(fp);
                    // Register plugin in loadedPlugins array
                    if (fp.loadedPlugins && Array.isArray(fp.loadedPlugins)) {
                        fp.loadedPlugins.push('autocompletePlugin');
                    }
                });
            },
        };
    };
}

export { autocompletePlugin as default };
//# sourceMappingURL=index.js.map
