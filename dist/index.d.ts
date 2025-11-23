import type { Plugin } from 'flatpickr/dist/types/options';
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
export default function autocompletePlugin(): Plugin;
//# sourceMappingURL=index.d.ts.map