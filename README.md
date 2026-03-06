<p align="center">
  <img src="https://gethomepage.dev/assets/banner_light%402x.png" alt="GetHomepage" width="500" />
</p>

<h1 align="center">GetHomepage IntelliSense</h1>

<p align="center">
  <strong>YAML IntelliSense, autocompletion, validation and snippets for <a href="https://gethomepage.dev">GetHomepage</a> configuration files.</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=gethomepage.gethomepage-intellisense">
    <img src="https://img.shields.io/visual-studio-marketplace/v/gethomepage.gethomepage-intellisense?style=flat-square&label=VS%20Marketplace" alt="Version" />
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=gethomepage.gethomepage-intellisense">
    <img src="https://img.shields.io/visual-studio-marketplace/i/gethomepage.gethomepage-intellisense?style=flat-square" alt="Installs" />
  </a>
  <a href="https://github.com/nicolasaigner/gethomepage-intellisense/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/nicolasaigner/gethomepage-intellisense?style=flat-square" alt="License" />
  </a>
</p>

---

## Features

- **Schema Validation** — Real-time error highlighting for invalid properties, wrong types, and missing required fields
- **Autocompletion** — Smart suggestions for all configuration properties, widget types, themes, colors, and more
- **Hover Documentation** — Hover over any property to see its description and allowed values
- **Snippets** — Ready-to-use templates for services, bookmarks, widgets, layouts, and more
- **151 Widget Types** — Full support for all GetHomepage service widgets
- **Custom Language ID** — Scoped `yaml-homepage` language so IntelliSense only activates on your homepage config files

## Supported Files

| File              | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `settings.yaml`   | Application settings (theme, layout, language, etc.) |
| `services.yaml`   | Dashboard services and widgets                       |
| `widgets.yaml`    | Global info widgets (weather, search, resources)     |
| `bookmarks.yaml`  | Bookmark links                                       |
| `docker.yaml`     | Docker server configuration                          |
| `kubernetes.yaml` | Kubernetes configuration                             |
| `proxmox.yaml`    | Proxmox node configuration                           |

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"GetHomepage IntelliSense"**
4. Click **Install**

### From .vsix (Local)

```bash
# Clone and build
git clone https://github.com/nicolasaigner/gethomepage-intellisense.git
cd gethomepage-intellisense
npm install
npm run package

# Install the generated .vsix file
code --install-extension gethomepage-intellisense-*.vsix
```

## Setup

After installing, add the following to your workspace's `.vscode/settings.json` to associate your GetHomepage config files with the extension:

```jsonc
{
  "files.associations": {
    // Adjust the path to match your project structure
    "config/*.yaml": "yaml-homepage"
  }
}
```

> **Tip:** You can be more specific if you have other YAML files in the same folder:
>
> ```jsonc
> {
>   "files.associations": {
>     "config/settings.yaml": "yaml-homepage",
>     "config/services.yaml": "yaml-homepage",
>     "config/widgets.yaml": "yaml-homepage",
>     "config/bookmarks.yaml": "yaml-homepage",
>     "config/docker.yaml": "yaml-homepage",
>     "config/kubernetes.yaml": "yaml-homepage",
>     "config/proxmox.yaml": "yaml-homepage"
>   }
> }
> ```

That's it! Open any associated file and start getting IntelliSense.

## Snippets

Type the snippet prefix and press `Tab` or `Enter` to expand:

| Prefix            | Description                             |
| ----------------- | --------------------------------------- |
| `service`         | New service with widget                 |
| `service-simple`  | New service without widget              |
| `service-proxmox` | Service with Proxmox integration        |
| `service-docker`  | Service with Docker integration         |
| `group`           | New service group                       |
| `bookmark`        | New bookmark                            |
| `bookmark-group`  | New bookmark group                      |
| `glances`         | Glances monitoring widget               |
| `resources`       | Local resources widget (CPU, RAM, disk) |
| `search`          | Search widget                           |
| `datetime`        | Date/time widget                        |
| `greeting`        | Greeting widget                         |
| `weather`         | OpenWeatherMap widget                   |
| `openmeteo`       | Open-Meteo widget (no API key needed)   |
| `customapi`       | Custom API widget                       |
| `iframe`          | Embedded iFrame widget                  |
| `layout`          | Group layout configuration              |
| `docker`          | Docker server configuration             |
| `proxmox`         | Proxmox node configuration              |
| `logo`            | Logo widget                             |
| `stocks`          | Stocks widget (Finnhub)                 |
| `background`      | Background image configuration          |
| `quicklaunch`     | Quick Launch configuration              |
| `providers`       | Shared providers configuration          |

## Supported Widget Types

All **151** service widget types are recognized and validated:

<details>
<summary>Click to expand full list</summary>

`adguard` · `apcups` · `argocd` · `audiobookshelf` · `authentik` · `autobrr` · `bazarr` · `caddy` · `calendar` · `calibreweb` · `changedetectionio` · `cloudflared` · `customapi` · `deluge` · `dockhand` · `emby` · `esphome` · `evcc` · `filebrowser` · `firefly` · `flood` · `freshrss` · `frigate` · `fritzbox` · `gamedig` · `gatus` · `ghostfolio` · `gitea` · `gitlab` · `glances` · `gluetun` · `gotify` · `grafana` · `hdhomerun` · `headscale` · `healthchecks` · `homeassistant` · `homebox` · `homebridge` · `immich` · `jackett` · `jdownloader` · `jellyfin` · `jellystat` · `kavita` · `komga` · `komodo` · `kopia` · `lidarr` · `linkwarden` · `lubelogger` · `mailcow` · `mastodon` · `mealie` · `medusa` · `mikrotik` · `minecraft` · `miniflux` · `moonraker` · `mylar` · `myspeed` · `navidrome` · `netalertx` · `netdata` · `nextcloud` · `nextdns` · `npm` · `nzbget` · `octoprint` · `omada` · `ombi` · `opendtu` · `openmediavault` · `openwrt` · `opnsense` · `overseerr` · `paperlessngx` · `peanut` · `pfsense` · `photoprism` · `pihole` · `plantit` · `plex` · `portainer` · `prometheus` · `prowlarr` · `proxmox` · `proxmoxbackupserver` · `pterodactyl` · `pyload` · `qbittorrent` · `qnap` · `radarr` · `readarr` · `romm` · `rutorrent` · `sabnzbd` · `scrutiny` · `seerr` · `slskd` · `sonarr` · `speedtest` · `spoolman` · `stash` · `strelaysrv` · `suwayomi` · `tailscale` · `tandoor` · `tautulli` · `tdarr` · `technitium` · `traefik` · `transmission` · `trilium` · `truenas` · `tubearchivist` · `unifi` · `unmanic` · `unraid` · `uptimekuma` · `uptimerobot` · `urbackup` · `vikunja` · `wallos` · `watchtower` · `wgeasy` · `whatsupdocker` · `xteve` · `zabbix`

</details>

## Requirements

- **[YAML Language Support by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)** — Installed automatically as a dependency

## Contributing

Contributions are welcome! Please feel free to submit a [Pull Request](https://github.com/nicolasaigner/gethomepage-intellisense/pulls).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related

- [GetHomepage](https://gethomepage.dev) — A highly customizable homepage (or startpage / application dashboard)
- [GetHomepage GitHub](https://github.com/gethomepage/homepage)
- [YAML Language Support](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for the <a href="https://gethomepage.dev">GetHomepage</a> community
</p>
