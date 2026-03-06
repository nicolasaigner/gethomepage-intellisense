# Changelog

All notable changes to the **GetHomepage IntelliSense** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-05

### Added

- JSON Schema validation for all 7 GetHomepage configuration files:
  - `settings.yaml` — theme, layout, language, background, quicklaunch, providers, and more
  - `services.yaml` — service groups, service properties, widget definitions with all 151 widget types
  - `widgets.yaml` — 12 info widget types (greeting, datetime, search, resources, glances, openweathermap, openmeteo, logo, stocks, kubernetes, longhorn, unifi_console)
  - `bookmarks.yaml` — bookmark groups with href, icon, abbr, description
  - `docker.yaml` — Docker server configuration (socket, host/port, TLS, swarm)
  - `kubernetes.yaml` — Kubernetes mode, ingress, traefik, gateway
  - `proxmox.yaml` — Proxmox node configuration (url, token, secret)
- Custom language ID `yaml-homepage` with YAML syntax highlighting
- 24 code snippets for rapid configuration scaffolding
- Autocompletion for all configuration properties
- Real-time validation with error highlighting
- Hover documentation for properties and allowed values

[0.1.0]: https://github.com/nicolasaigner/gethomepage-intellisense/releases/tag/v0.1.0
