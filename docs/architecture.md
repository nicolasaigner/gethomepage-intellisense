# Architecture and implementation history

## Upstream foundation
The original extension provides GetHomepage YAML schemas and snippets in Portuguese under `schemas/` and `snippets/`.

## TypeScript and localization work (2026)
- Converted runtime to TypeScript (`src/extension.ts`) with compiled `out/extension.js` and source maps.
- Added localized schema sets in `schemas/en/` and `schemas/pt-BR/`, and corresponding snippet collections.
- Dynamically registers YAML schemas via the Red Hat YAML extension contributor API and snippets through VS Code's completion provider.
- Explicitly activates on standard YAML; VS Code generates the custom `yaml-homepage` activation event from its language contribution. English hover text was verified in the Extension Development Host.
- Added Oxlint, Oxfmt, VS Code workspace configuration, debug launch, and compilation task.
- Added locale tests, an offline locale scaffolder, and `src/locales.json` as the locale registry.

## Translation implementation update

The initial `translate-locales.cjs` script relied on an unofficial Google Translate endpoint and encountered HTTP 429 rate limits. No replacement translation API was introduced. English schema descriptions were instead translated directly with AI assistance, preserving the original schema validation structure; the full set of seven English schema descriptions is now translated. English snippets are now translated as well; hands-on language testing remains pending.

## Decision: community-owned language contributions

We did not prepopulate every possible language. Bulk machine translation hit HTTP 429 rate limits, so new locales are intentionally added by individual contributors using the offline scaffolder. This spreads any external translation-service load across the community and gives each language a chance for human review. See [localization.md](localization.md).

## Constraints
- English schema and snippet text is translated, but final in-editor review is still required.
- Do not translate schema property names, enum values, URLs, widget IDs, or validation constraints.
- Runtime schema matching uses filenames like `services.yaml`.
- The original root-level Portuguese schemas/snippets remain as upstream reference files.
