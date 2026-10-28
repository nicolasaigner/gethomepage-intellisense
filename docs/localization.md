# Adding a language

Run from the repository root:

```sh
npm install
npm run locale:add -- --locale fr-FR
```

Optionally copy from Portuguese:

```sh
npm run locale:add -- --locale es-ES --from pt-BR
```

The offline command copies all seven schemas to `schemas/<locale>/`, copies `snippets/<locale>.code-snippets`, and adds the locale to `src/locales.json`. Existing locales are never overwritten. No translation API or TypeScript edits are required.

## Translation approach and history

Our original automated translation script (`translate-locales.cjs`) called an unofficial Google Translate endpoint. The service responded with HTTP 429 rate-limit errors, preventing reliable bulk translation. We did **not** switch to a different translation API: the English schema descriptions were subsequently translated directly with AI assistance and checked against the Portuguese source, without making external translation API requests.

The seven English schema files now have translated descriptions. English snippet text has also been translated, with Portuguese prefix aliases preserved for compatibility. English and Portuguese were smoke-tested successfully in the Extension Development Host. Individual widget translations will be improved through community use. Future contributors may translate manually, use AI assistance, or use a translation service of their choice; translations should be reviewed for technical accuracy.

## Why languages are community-contributed

We initially considered generating translations for many languages centrally, but the translation service returned HTTP 429 rate-limit errors during the English translation work. Rather than repeatedly hitting that limit or shipping unreviewed machine translations, we intentionally support a contributor-by-contributor approach.

The `locale:add` command handles the mechanical setup offline. Developers can contribute the languages they know, translate and review the text using their own preferred workflow, and submit focused pull requests. This distributes any translation-service usage and rate limits across the community instead of concentrating them in one maintainer's account or process. **No external translation service is required** to add a locale, and machine-generated translations should still be reviewed by a fluent contributor.

## Translation rules
- Translate human-facing schema `title`, `description`, and `markdownDescription`.
- Translate snippet names, descriptions, and appropriate placeholder defaults.
- Preserve property keys, enum values, YAML syntax, snippet tab-stop syntax, paths, URLs, and service/widget identifiers.
- Keep useful existing snippet prefix aliases and add translated ones where appropriate.
- Review translations manually. Use the English schema as a starting point, but verify technical terminology against Homepage documentation and correct inaccuracies as they are discovered.

## Test
```sh
npm run check
npm run lint
npm test
npm run package
```

Press F5 to launch the Extension Development Host. Change its display language to the new locale (or start VS Code with `--locale=<locale>`), restart, and test hover descriptions and Ctrl+Space completions on GetHomepage YAML files.

Locale selection uses an exact match first, then the first registered locale sharing the language code, then English.
