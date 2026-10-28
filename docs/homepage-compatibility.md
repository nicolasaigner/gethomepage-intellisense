# Homepage documentation compatibility audit

Source: https://github.com/gethomepage/homepage (default branch `dev`), consulted 2026-10-28. The Homepage docs are authoritative for configuration examples; this extension's schemas are an independently maintained approximation and may lag new widget releases.

## Configuration pages reviewed

- https://gethomepage.dev/configs/settings/
- https://gethomepage.dev/configs/services/
- https://gethomepage.dev/configs/bookmarks/
- https://gethomepage.dev/configs/docker/
- https://gethomepage.dev/configs/kubernetes/
- https://gethomepage.dev/configs/proxmox/
- https://github.com/gethomepage/homepage/blob/dev/docs/widgets/services/index.md
- https://github.com/gethomepage/homepage/blob/dev/docs/widgets/services/bookorbit.md
- https://github.com/gethomepage/homepage/blob/dev/docs/widgets/services/qui.md
- https://github.com/gethomepage/homepage/blob/dev/docs/widgets/services/diskstation.md
- https://github.com/gethomepage/homepage/blob/dev/docs/widgets/services/qnap.md

## Changes made

- Added documented `settings.yaml` properties: `cardStyle`, `blockStyle`, `font`, `iconStyle`, `hideVersion`, `disableUpdateCheck`, `hideErrors`, and `logpath`.
- Expanded `headerStyle` to include `boxedWidgets`.
- Added `quicklaunch.mobileButtonPosition`, `quicklaunch.suggestionUrl`, `quicklaunch.target`, and `quicklaunch.provider: custom`.
- Added `bookorbit` and `qui` widget types, `widget.hideErrors`, and `widget.instance`.
- Added `widget.volume` with localized hover text for Synology DiskStation and QNAP.
- Mirrored all schema changes in English and Brazilian Portuguese.

## Scope and follow-up

The seven configuration schema shapes were inspected against the main documentation pages. This was not an exhaustive audit of all individual service-widget documentation or the Homepage runtime source. Widget-specific settings remain permissive (`additionalProperties: true`) to avoid rejecting valid upstream options that have not yet been modeled. Future work: systematically compare every documented widget's options and supported fields against the service-widget schema and add regression fixtures for documented YAML examples.
