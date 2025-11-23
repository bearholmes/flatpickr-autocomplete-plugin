import type { Plugin } from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';

/**
 * Autocomplete attribute names to transfer
 */
const AUTOCOMPLETE_ATTRIBUTES = ['autocomplete', 'aria-autocomplete'] as const;

type AutocompleteAttribute = (typeof AUTOCOMPLETE_ATTRIBUTES)[number];

/**
 * Logs a warning message only in development mode without directly referencing `console`.
 */
function warnInDev(...args: unknown[]): void {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const consoleLike = (
    globalThis as typeof globalThis & {
      console?: Console;
    }
  ).console;

  consoleLike?.warn?.(...args);
}

/**
 * Safely transfers an attribute from source element to target element
 *
 * @param sourceElement - The element to read the attribute from
 * @param targetElement - The element to set the attribute on
 * @param attributeName - The name of the attribute to transfer
 * @returns true if the attribute was transferred, false otherwise
 */
function transferAttribute(
  sourceElement: HTMLElement,
  targetElement: HTMLElement | undefined,
  attributeName: AutocompleteAttribute,
): boolean {
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
  } catch (error) {
    // Silently fail - DOM manipulation errors shouldn't break the plugin
    warnInDev(`Failed to transfer attribute "${attributeName}":`, error);
  }

  return false;
}

/**
 * Gets the target input element where autocomplete attributes should be applied
 *
 * @param fp - The flatpickr instance
 * @returns The target input element (mobileInput or altInput), or undefined
 */
function getTargetInput(fp: Instance): HTMLElement | undefined {
  return fp.mobileInput || fp.altInput || undefined;
}

/**
 * Processes autocomplete attributes after flatpickr is ready
 *
 * @param fp - The flatpickr instance
 */
function processAutocompleteAttributes(fp: Instance): void {
  // Ensure the input element exists
  if (!fp.input) {
    warnInDev('Flatpickr input element not found');
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
export default function autocompletePlugin(): Plugin {
  return (fp: Instance): { onReady: () => void } => {
    return {
      /**
       * Hook called when flatpickr is fully initialized
       */
      onReady(): void {
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
