# protondb-cli

[![CI](https://github.com/jegj/protondb-cli/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/jegj/protondb-cli/actions/workflows/build.yml)
[![view on npm](http://img.shields.io/npm/v/protondb-cli.svg)](https://www.npmjs.com/package/protondb-cli)
[![license](http://img.shields.io/npm/l/protondb-cli.svg)](https://www.npmjs.com/package/protondb-cli)

A simple unofficial CLI for [ProtonDB project](https://www.protondb.com/).
Let's face it, if you know about ProtonDB you must love video
games and Linux and what better than an CLI for a Linux fan
to check your games compatibility on Steam.

![protondb-cli.gif](docs/imgs/readme.2x.gif)

## Installation

```sh
npm i protondb-cli -g
```

## Usage

```sh
protondb-cli "Counter strike"
```

When the search returns matches, an inline picker is shown so you can pick a
game; the selection and result stay in your normal terminal scrollback (no
full-screen UI). After picking, a short summary is printed by default with the
game name, tier, confidence, OS list, and user score.

### Flags

| Flag      | Description                                                               |
| :-------- | :------------------------------------------------------------------------ |
| `-d` / `--detail` | Show the full sectioned card (Identity, Compatibility, Metadata, Requirements) instead of the summary. |
| `--json`  | Emit machine-readable JSON. No color, no spinner, no picker.              |
| `-v` / `--verbose` | Verbose logging through to the fetchers.                         |
| `-h` / `--hits` | Limit the number of search results.                                 |
| `-c` / `--concurrency` | Limit concurrency for the search.                            |
| `--disable_cache` | Bypass the local cache.                                           |
| `--clear_cache` | Wipe the local cache.                                               |
| `--old-view`  | Use the v1.15.0 blessed-based full-screen TUI instead of the default inline picker. |

```sh
protondb-cli "Half-Life" --detail
```

### Piping and scripting

When stdout is not a TTY (e.g. piped into another command), the CLI auto-picks
the top match and emits a single JSON object — no picker, no color, no spinner.
This composes cleanly with shell pipelines:

```sh
protondb-cli "fifa" | jq -r .name
protondb-cli "Half-Life" --json | jq '.[0].tier'
```

`NO_COLOR=1` is respected for ANSI-free output.

### Tiers

Describe the support on Linux with ProtonDB

| Tier      | Description                                                               |
| :-------- | :------                                                                   |
| Platinum  | Runs perfectly out of the box                                             |
| Gold      | Runs perfectly after tweaks                                               |
| Silver    | Runs with minor issues, but generally playable                            |
| Bronze    | Runs, but often crashes or has issues preventing from playing comfortably |
| Borked    | Either won't start or is crucially unplayable                             |
| N/A       | Wihtout Tier. Comunity haven't report this game yet                       |

### Confidence

Describe the support of the community under the tier

## Using Docker

```sh
docker pull jegj/protondb-cli
docker run -it --rm jegj/protondb-cli fifa
```

## Adding command "protondb" to your terminal

By adding the following code to your terminal (for example `~/.zshrc`), you can use it pretty easy.

```sh
protondb() {
    if [ -z "$1" ]; then
        echo "Usage: protondb <game_name>"
        return 1
    fi
    docker pull jegj/protondb-cli
    docker run -it --rm jegj/protondb-cli "$1"
}
```

You can also use the following command, to add it automatically into the rc file of your current shell (zsh or bash only).

```sh
rc="$HOME/.bashrc"; [ -n "$ZSH_VERSION" ] && rc="$HOME/.zshrc"; grep -q '^protondb()' "$rc" 2>/dev/null && echo "protondb function already exists in $rc – nothing to do." || { printf '\nprotondb() {\n    if [ -z "$1" ]; then\n        echo "Usage: protondb <game_name>"\n        return 1\n    fi\n    docker pull jegj/protondb-cli\n    docker run -it --rm jegj/protondb-cli "$1"\n}\n' >> "$rc" && echo "protondb function has been installed in $rc"; }
```
