# Changelog

All notable changes to this project are documented here using [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

- Added a committed ESLint configuration (with an `eslint`-specific tsconfig) and ignored artifacts so the TypeScript source stays lint-clean.
- Husky’s pre-commit hook now runs format, lint, and test, while GitHub Actions mirrors those stages along with type checking and the Rollup build.
- Documentation updates highlight the GitHub Pages demo URL and describe the automated quality tooling.
- Pinned the dev-only TypeScript version to `5.3.3` to match `@typescript-eslint`’s supported range and avoid parser warnings.

## [1.0.4] - 2025-11-23

- Complete TypeScript rewrite with modern Rollup build output and testing tooling.
- Improved accessibility, error handling, and documentation (README, PROJECT_INFO.md, demos).
- Updated tooling (ESLint, Prettier, Jest) and published framework-specific examples.

## [1.0.3] - 2024-03-17

- Updated type definitions and addressed minor bugs.

## [1.0.2]

- Fixed attribute transfer logic for autocomplete attributes.

## [1.0.1]

- Initial release with autocomplete attribute transfer and `aria-autocomplete` support.

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

[Unreleased]: https://github.com/bearholmes/flatpickr-autocomplete-plugin/compare/v1.0.4...HEAD
[1.0.3]: https://github.com/bearholmes/flatpickr-autocomplete-plugin/releases/tag/v1.0.3
[1.0.2]: https://github.com/bearholmes/flatpickr-autocomplete-plugin/releases/tag/v1.0.2
[1.0.1]: https://github.com/bearholmes/flatpickr-autocomplete-plugin/releases/tag/v1.0.1
