import autocompletePlugin from '../index';
import type { Instance } from 'flatpickr/dist/types/instance';

/**
 * Mock flatpickr instance for testing
 */
function createMockFlatpickr(
  options: {
    hasInput?: boolean;
    hasMobileInput?: boolean;
    hasAltInput?: boolean;
    autocomplete?: string;
    ariaAutocomplete?: string;
  } = {},
): Instance {
  const {
    hasInput = true,
    hasMobileInput = false,
    hasAltInput = false,
    autocomplete,
    ariaAutocomplete,
  } = options;

  const input = hasInput ? document.createElement('input') : undefined;
  if (input) {
    if (autocomplete !== undefined) {
      input.setAttribute('autocomplete', autocomplete);
    }
    if (ariaAutocomplete !== undefined) {
      input.setAttribute('aria-autocomplete', ariaAutocomplete);
    }
  }

  const mobileInput = hasMobileInput
    ? document.createElement('input')
    : undefined;
  const altInput = hasAltInput ? document.createElement('input') : undefined;

  return {
    input: input as HTMLInputElement,
    mobileInput: mobileInput as HTMLInputElement,
    altInput: altInput as HTMLInputElement,
    loadedPlugins: [],
  } as unknown as Instance;
}

describe('autocompletePlugin', () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = '';
  });

  describe('Plugin initialization', () => {
    it('should return a plugin function', () => {
      const plugin = autocompletePlugin();
      expect(typeof plugin).toBe('function');
    });

    it('should return an object with onReady hook', () => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr();
      const hooks = plugin(fp);

      expect(hooks).toHaveProperty('onReady');
      expect(typeof hooks.onReady).toBe('function');
    });

    it('should register plugin in loadedPlugins array', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({ hasMobileInput: true });
      const hooks = plugin(fp);

      hooks.onReady();

      // Wait for requestAnimationFrame
      requestAnimationFrame(() => {
        expect(fp.loadedPlugins).toContain('autocompletePlugin');
        done();
      });
    });
  });

  describe('Autocomplete attribute transfer to mobileInput', () => {
    it('should transfer autocomplete attribute from input to mobileInput', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasMobileInput: true,
        autocomplete: 'off',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.input?.hasAttribute('autocomplete')).toBe(false);
        expect(fp.mobileInput?.getAttribute('autocomplete')).toBe('off');
        done();
      });
    });

    it('should transfer aria-autocomplete attribute from input to mobileInput', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasMobileInput: true,
        ariaAutocomplete: 'none',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.input?.hasAttribute('aria-autocomplete')).toBe(false);
        expect(fp.mobileInput?.getAttribute('aria-autocomplete')).toBe('none');
        done();
      });
    });

    it('should transfer both attributes when present', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasMobileInput: true,
        autocomplete: 'off',
        ariaAutocomplete: 'list',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.input?.hasAttribute('autocomplete')).toBe(false);
        expect(fp.input?.hasAttribute('aria-autocomplete')).toBe(false);
        expect(fp.mobileInput?.getAttribute('autocomplete')).toBe('off');
        expect(fp.mobileInput?.getAttribute('aria-autocomplete')).toBe('list');
        done();
      });
    });
  });

  describe('Autocomplete attribute transfer to altInput', () => {
    it('should transfer autocomplete attribute from input to altInput when no mobileInput', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasAltInput: true,
        autocomplete: 'email',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.input?.hasAttribute('autocomplete')).toBe(false);
        expect(fp.altInput?.getAttribute('autocomplete')).toBe('email');
        done();
      });
    });

    it('should prefer mobileInput over altInput when both exist', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasMobileInput: true,
        hasAltInput: true,
        autocomplete: 'off',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.input?.hasAttribute('autocomplete')).toBe(false);
        expect(fp.mobileInput?.getAttribute('autocomplete')).toBe('off');
        expect(fp.altInput?.hasAttribute('autocomplete')).toBe(false);
        done();
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle missing input element gracefully', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({ hasInput: false });
      const hooks = plugin(fp);

      expect(() => {
        hooks.onReady();
      }).not.toThrow();

      requestAnimationFrame(() => {
        done();
      });
    });

    it('should handle missing target input (no mobileInput or altInput)', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        autocomplete: 'off',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        // Attribute should remain on input since there's no target
        expect(fp.input?.getAttribute('autocomplete')).toBe('off');
        done();
      });
    });

    it('should handle input without autocomplete attributes', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasMobileInput: true,
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.mobileInput?.hasAttribute('autocomplete')).toBe(false);
        expect(fp.mobileInput?.hasAttribute('aria-autocomplete')).toBe(false);
        done();
      });
    });

    it('should handle empty autocomplete attribute value', (done) => {
      const plugin = autocompletePlugin();
      const fp = createMockFlatpickr({
        hasMobileInput: true,
        autocomplete: '',
      });
      const hooks = plugin(fp);

      hooks.onReady();

      requestAnimationFrame(() => {
        expect(fp.input?.hasAttribute('autocomplete')).toBe(false);
        expect(fp.mobileInput?.getAttribute('autocomplete')).toBe('');
        done();
      });
    });
  });

  describe('Multiple plugin instances', () => {
    it('should work independently for multiple flatpickr instances', (done) => {
      const plugin1 = autocompletePlugin();
      const plugin2 = autocompletePlugin();

      const fp1 = createMockFlatpickr({
        hasMobileInput: true,
        autocomplete: 'off',
      });
      const fp2 = createMockFlatpickr({
        hasAltInput: true,
        autocomplete: 'on',
      });

      const hooks1 = plugin1(fp1);
      const hooks2 = plugin2(fp2);

      hooks1.onReady();
      hooks2.onReady();

      requestAnimationFrame(() => {
        expect(fp1.mobileInput?.getAttribute('autocomplete')).toBe('off');
        expect(fp2.altInput?.getAttribute('autocomplete')).toBe('on');
        done();
      });
    });
  });
});
