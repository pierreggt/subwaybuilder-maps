# Subway Builder Maps — pierreggt collection

A shared repository of community-created [Subway Builder](https://store.steampowered.com/app/2716540/Subway_Builder/) maps, built with [depot](https://github.com/Subway-Builder-Modded/depot).

Each map lives in its own top-level folder (full mod source, `.pmtiles` tracked via [Git LFS](https://git-lfs.com/)) and is also published as a versioned [GitHub Release](../../releases), one release per map (tag format `<code>-vX.Y.Z`), with the release asset being the flat data zip.

## Registry updates

This repo hosts **multiple maps as separate releases**. The [Subway-Builder-Modded registry](https://github.com/Subway-Builder-Modded/registry)'s "GitHub Releases" update type only supports repositories that publish a single mod or map — it always resolves to whatever release is currently tagged "latest" repo-wide, which would silently serve the wrong map's zip here.

Each map is therefore registered with the registry as **`Update Type: Custom URL`**, pointing at a dedicated manifest in [`updates/`](updates/):

```
https://raw.githubusercontent.com/pierreggt/subwaybuilder-maps/main/updates/<code>-update.json
```

Each `<code>-update.json` follows the registry's `schema_version: 1` update manifest format (`versions[]` with `version`, `game_version`, `date`, `download`, `sha256`) and points at that specific map's own GitHub Release asset — so pulling in a new release for one map never affects any other map's update pointer.

## Maps

| City | Code | Update manifest |
|---|---|---|
| Baghdad | BGD | [updates/bgd-update.json](updates/bgd-update.json) |
| Erbil | ERB | [updates/erb-update.json](updates/erb-update.json) |
| Mosul | MOS | [updates/mos-update.json](updates/mos-update.json) |
| Damascus | DAM | [updates/dam-update.json](updates/dam-update.json) |
| Aleppo | ALP | [updates/alp-update.json](updates/alp-update.json) |
| Tehran (incl. Karaj) | THR | [updates/thr-update.json](updates/thr-update.json) |
| Mashhad | MHD | [updates/mhd-update.json](updates/mhd-update.json) |
| Shiraz | SYZ | [updates/syz-update.json](updates/syz-update.json) |
| Riyadh | RUH | [updates/ruh-update.json](updates/ruh-update.json) |
| Mecca & Jeddah | MKJ | [updates/mkj-update.json](updates/mkj-update.json) |
| Doha | DOH | [updates/doh-update.json](updates/doh-update.json) |
| Abu Dhabi | AUH | [updates/auh-update.json](updates/auh-update.json) |
| Kuwait City | KWI | [updates/kwi-update.json](updates/kwi-update.json) |
| Muscat | MCT | [updates/mct-update.json](updates/mct-update.json) |
| Beirut | BEY | [updates/bey-update.json](updates/bey-update.json) |
| Alexandria | HBE | [updates/hbe-update.json](updates/hbe-update.json) |

## Installation

See each map's own folder for a dedicated README with installation instructions, or install directly via the in-game Railyard registry.

## Credits

Data © OpenStreetMap contributors (ODbL), Overture Maps Foundation, and each country's official statistics body (credited per-map).
