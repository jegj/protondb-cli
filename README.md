# protondb-cli

[![CI](https://github.com/jegj/protondb-cli/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/jegj/protondb-cli/actions/workflows/build.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)
[![view on npm](http://img.shields.io/npm/v/protondb-cli.svg)](https://www.npmjs.com/package/protondb-cli)
[![license](http://img.shields.io/npm/l/protondb-cli.svg)](https://www.npmjs.com/package/protondb-cli)

A simple unofficial CLI for [ProtonDB project](https://www.protondb.com/).
Let's face it, if you know about ProtonDB you must love video
games and Linux and what better than an CLI for a Linux fan
to check your games compatibility on Steam.

![protondb-cli.gif](docs/imgs/readme.gif)

## Installation

```sh
npm i protondb-cli -g
```

## Usage

```sh
protondb-cli "Counter strike"
```

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
