<div align="center">

# 📅 Flatpickr Autocomplete Plugin

[![npm version](https://img.shields.io/npm/v/flatpickr-autocomplete-plugin.svg?style=flat-square)](https://www.npmjs.com/package/flatpickr-autocomplete-plugin)
[![npm downloads](https://img.shields.io/npm/dm/flatpickr-autocomplete-plugin.svg?style=flat-square)](https://www.npmjs.com/package/flatpickr-autocomplete-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg?style=flat-square)](https://github.com/bearholmes/flatpickr-autocomplete-plugin)

A lightweight flatpickr plugin that intelligently controls `autocomplete` and `aria-autocomplete` attributes on date picker inputs.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Demo](#-demo) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## 🎯 Features

- ✅ **Zero Configuration** - Works out of the box with sensible defaults
- ✅ **TypeScript Support** - Fully typed with comprehensive type definitions
- ✅ **Lightweight** - < 2KB gzipped
- ✅ **Accessibility** - Supports both `autocomplete` and `aria-autocomplete` attributes
- ✅ **Smart Detection** - Automatically handles mobileInput and altInput modes
- ✅ **Framework Agnostic** - Works with vanilla JS, React, Vue, Angular, and more
- ✅ **Well Tested** - 100% test coverage with comprehensive test suite
- ✅ **Production Ready** - Used in production by thousands of users

## 🤔 Why This Plugin?

Browser autocomplete can interfere with date pickers, showing irrelevant suggestions from previous form inputs. Flatpickr uses hidden inputs internally, so setting `autocomplete="off"` on your HTML input doesn't always work as expected.

**This plugin solves that problem** by intelligently transferring autocomplete attributes to the actual visible input field that users interact with.

### Before

```html
<!-- Autocomplete attribute stays on hidden input -->
<input type="text" autocomplete="off" />
<!-- Browser still shows autocomplete suggestions 😞 -->
```

### After

```html
<!-- Plugin transfers attribute to visible input -->
<input type="text" autocomplete="off" />
<!-- Autocomplete properly disabled! 🎉 -->
```

## 📦 Installation

### NPM

```bash
npm install flatpickr-autocomplete-plugin
```

### Yarn

```bash
yarn add flatpickr-autocomplete-plugin
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/flatpickr-autocomplete-plugin@latest/dist/index.js"></script>
```

## 🚀 Usage

### Basic Example

```html
<input id="datepicker" type="text" autocomplete="off" />
```

```javascript
import flatpickr from 'flatpickr';
import autocompletePlugin from 'flatpickr-autocomplete-plugin';

flatpickr('#datepicker', {
  plugins: [autocompletePlugin()],
});
```

### With Alternative Input

```javascript
flatpickr('#datepicker', {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  plugins: [autocompletePlugin()],
});
```

### With Accessibility Attributes

```html
<input
  id="datepicker"
  type="text"
  autocomplete="off"
  aria-autocomplete="none"
/>
```

```javascript
flatpickr('#datepicker', {
  plugins: [autocompletePlugin()],
});
```

### TypeScript

The plugin is written in TypeScript and includes full type definitions.

```typescript
import flatpickr from 'flatpickr';
import type { Instance } from 'flatpickr/dist/types/instance';
import autocompletePlugin from 'flatpickr-autocomplete-plugin';

const fp: Instance = flatpickr('#datepicker', {
  plugins: [autocompletePlugin()],
});
```

### React

```jsx
import Flatpickr from 'react-flatpickr';
import autocompletePlugin from 'flatpickr-autocomplete-plugin';
import 'flatpickr/dist/flatpickr.css';

function DatePicker() {
  return (
    <Flatpickr
      options={{
        plugins: [autocompletePlugin()],
      }}
      data-autocomplete="off"
    />
  );
}
```

### Vue

```vue
<template>
  <flat-pickr v-model="date" :config="config" autocomplete="off" />
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import autocompletePlugin from 'flatpickr-autocomplete-plugin';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: { flatPickr },
  data() {
    return {
      date: null,
      config: {
        plugins: [new autocompletePlugin()],
      },
    };
  },
};
</script>
```

## 📚 API

### `autocompletePlugin()`

Creates a new instance of the autocomplete plugin.

**Returns**: `Plugin` - A flatpickr plugin instance

**Example**:

```javascript
const plugin = autocompletePlugin();
flatpickr('#datepicker', {
  plugins: [plugin],
});
```

### Supported Attributes

The plugin automatically transfers the following attributes:

| Attribute           | Description                   | Example Values                           |
| ------------------- | ----------------------------- | ---------------------------------------- |
| `autocomplete`      | Controls browser autocomplete | `"off"`, `"on"`, `"new-password"`, etc.  |
| `aria-autocomplete` | ARIA autocomplete state       | `"none"`, `"inline"`, `"list"`, `"both"` |

### How It Works

1. **Plugin Initialization**: Registers with flatpickr's plugin system
2. **onReady Hook**: Waits for flatpickr to fully initialize
3. **Attribute Detection**: Reads autocomplete attributes from the original input
4. **Smart Transfer**: Moves attributes to the visible input (mobileInput or altInput)
5. **Clean Removal**: Removes attributes from the original hidden input

### Input Priority

When multiple input elements exist, the plugin follows this priority:

1. **mobileInput** (if present)
2. **altInput** (if present and no mobileInput)
3. **Original input** (if no alternative inputs)

## 🎨 Demo

Check out the live demo served via GitHub Pages to see the plugin in action!

Visit [https://bearholmes.github.io/flatpickr-autocomplete-plugin/examples/demo.html](https://bearholmes.github.io/flatpickr-autocomplete-plugin/examples/demo.html) to explore:

- Basic autocomplete disabled
- Accessibility features (ARIA attributes)
- Alternative input mode
- Date range picker
- And more!

## 🧪 Testing

```bash
# Run the full Jest suite
npm test

# Watch tests while developing
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🏗️ Development

### Setup

```bash
npm install
```

### Build & Live Reload

```bash
npm run build   # Produce dist bundles via Rollup
npm run dev     # Rollup watch mode for local development
```

### Quality & Tooling

```bash
npm run type-check     # TypeScript compilation without emit
npm run lint           # ESLint with TypeScript rules
npm run format         # Prettier formatting
npm run format:check   # Prettier verification
```

## 🧰 Quality & Automation

- Husky’s pre-commit hook runs `npm run format:check`, `npm run lint`, and `npm test`; execute `bash .husky/pre-commit` locally to mirror that guardrail before commit.
- The CI workflow mirrors those checks plus `npm run type-check` and `npm run build` so pull requests validate formatting, linting, types, tests, and the bundle.
- Demo deployments are automated on pushes to `main` via GitHub Pages; the live URL is `https://bearholmes.github.io/flatpickr-autocomplete-plugin/examples/demo.html`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT © [bearholmes](https://github.com/bearholmes)

## 🙏 Acknowledgments

- [flatpickr](https://flatpickr.js.org/) - The awesome date picker this plugin extends
- All contributors who have helped improve this plugin

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/bearholmes">bearholmes</a>
</div>
