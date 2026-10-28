# Roadmap and upstream PR checklist

## Completed

- [x] Migrate the runtime to TypeScript with source maps.
- [x] Register localized schemas and snippets for English and Brazilian Portuguese.
- [x] Translate all seven English schemas and all 24 English snippets.
- [x] Preserve existing Portuguese snippet aliases.
- [x] Fix redundant VS Code activation event and configure debugger/build task.
- [x] Verify both English and Portuguese in the Extension Development Host (manual smoke test by contributor).
- [x] Confirm language-specific hover and completion behavior in the development host.
- [x] Add Oxfmt, Oxlint, TypeScript checks, and automated locale/schema parity tests.
- [x] Add automated checks for schema/snippet integrity, documented widget properties, and hover text on top-level settings and service widget properties.
- [x] Add GitHub Actions CI for type checking, lint, formatting, tests, and VSIX packaging.
- [x] Provide offline locale scaffolding and contributor/developer documentation.
- [x] Audit core Homepage configuration documentation and add missing settings/widget options in both locales.
- [x] Record Homepage compatibility references and limitations in `docs/homepage-compatibility.md`.
- [x] Open upstream draft PR #5 and push translation/compatibility updates.

## PR readiness and follow-up

- [x] Confirm GitHub Actions passes on the feature branch, uploads the VSIX artifact, and reports no deprecation warnings (verified by contributor).
- [x] Review the packaged VSIX and confirm extension behavior works as expected (verified by contributor).
- [ ] Address upstream maintainer feedback if requested (ongoing after review begins).

## Community-maintained follow-up (not PR blockers)

- Widget-by-widget real-world validation and translation corrections as contributors encounter issues.
- Additional languages contributed with `npm run locale:add`.
- Optional VS Code extension-host integration tests beyond the completed manual English/Portuguese smoke tests.
- Optional untranslated-string reporting as more locales are contributed.

## Translation history

An early script using an unofficial Google Translate endpoint received HTTP 429 errors. No replacement translation API was implemented. English schema descriptions were translated directly with AI assistance, and the extension was manually smoke-tested in both supported languages. Future translations are reviewed and maintained by contributors.
