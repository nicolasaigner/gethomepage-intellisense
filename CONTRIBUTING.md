# Contributing to GetHomepage IntelliSense

Thanks for contributing!

## Getting started

1. Fork the repository and clone your fork.
2. Run `npm install`.
3. Open the repository in VS Code and press **F5** to launch the Extension Development Host. The debug task compiles TypeScript automatically.
4. Open a GetHomepage YAML file in the development host and test hover descriptions, validation, and Ctrl+Space suggestions.
5. Run `npm run check`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run package`.
6. Submit a pull request to the upstream repository.

## Add a language

One command creates and registers the new language:

```sh
npm run locale:add -- --locale fr-FR
```

To start from Portuguese instead of English:

```sh
npm run locale:add -- --locale es-ES --from pt-BR
```

Then translate the new files in `schemas/<locale>/` and `snippets/<locale>.code-snippets`. **Only translate human-facing text**; never change YAML property names, enums, or validation rules. See [docs/localization.md](docs/localization.md) and [docs/testing.md](docs/testing.md) for details. English schema descriptions have been translated directly without a translation API; English snippets have also been translated; both locales were smoke-tested in VS Code; individual widget strings will be refined through community contributions.

### Why not include every language already?

Our initial bulk translation attempts encountered HTTP 429 rate limits. Instead of relying on one maintainer to generate every language, we're inviting contributors to add and review individual languages. The scaffolding script runs offline, so you can translate manually or use your own tools without depending on a shared translation API quota. See [docs/localization.md](docs/localization.md).

## Other contributions

- **Schema updates:** update configuration schemas when GetHomepage adds new options; keep locale validation behavior equivalent.
- **Snippets:** add useful templates to localized snippet collections.
- **Bugs:** include VS Code version, extension version, reproduction steps, and expected versus actual behavior.

## Developer documentation

Read [docs/README.md](docs/README.md) for architecture, completed work, roadmap, and PR readiness. Please update the relevant document with significant implementation changes.

## Commit convention

Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## License

Contributions are licensed under the MIT License.
