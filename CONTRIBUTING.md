# Contributing to GetHomepage IntelliSense

Thank you for your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-user>/gethomepage-intellisense.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Test locally: `npm run package && code --install-extension gethomepage-intellisense-*.vsix`
6. Submit a Pull Request

## What Can You Contribute?

### Schema Updates

When GetHomepage adds new configuration options or widget types, the JSON schemas in `schemas/` need to be updated.

### New Snippets

Add useful snippet templates to `snippets/gethomepage.code-snippets`.

### Bug Reports

Open an [issue](https://github.com/nicolasaigner/gethomepage-intellisense/issues) with:

- VS Code version
- Extension version
- Steps to reproduce
- Expected vs actual behavior

## Project Structure

```
gethomepage-intellisense/
├── schemas/                    # JSON Schema files for YAML validation
│   ├── settings.schema.json
│   ├── services.schema.json
│   ├── widgets.schema.json
│   ├── bookmarks.schema.json
│   ├── docker.schema.json
│   ├── kubernetes.schema.json
│   └── proxmox.schema.json
├── snippets/                   # Code snippets
│   └── gethomepage.code-snippets
├── syntaxes/                   # TextMate grammar
│   └── yaml-homepage.tmLanguage.json
├── language-configuration.json # Language configuration for yaml-homepage
├── package.json                # Extension manifest
├── CHANGELOG.md
└── README.md
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `chore:` — Maintenance tasks

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
