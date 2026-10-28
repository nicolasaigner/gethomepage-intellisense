# Testing and validation

## Automated checks

From the repository root, run:

```sh
npm ci
npm run check
npm run lint
npm run format:check
npm test
npm run package
```

GitHub Actions runs the same checks on pushes and pull requests. `npm test` covers locale resolution and fallback, English/Portuguese validation parity across all seven schemas, registered schema file integrity, snippet counts and structure, hover descriptions on top-level settings and service widget properties, and a small regression set of documented widget options. Snippet names are intentionally translated, so their keys do not need to match across locales.

## Manual smoke test

Press F5 in VS Code to launch the Extension Development Host. For a Portuguese host, launch with `--locale=pt-br`; for English, use `--locale=en` or the default English display language. Restart the host after changing locale. Open `settings.yaml`, `services.yaml`, and `widgets.yaml`, then check property hover descriptions, YAML diagnostics, and Ctrl+Space snippets. Confirm that `widget.volume` displays localized hover text in `services.yaml`.

English and Portuguese were smoke-tested successfully in the Extension Development Host. Exhaustive per-widget manual testing is intentionally deferred to real-world community use; contributors should report and fix missing or inaccurate strings as discovered.

## Scope

Unit tests check static assets and schema equivalence; they do not launch VS Code or prove every widget integration works against a running Homepage instance. CI packaging verifies that a VSIX can be built, not that its behavior has been exhaustively tested in the editor.
