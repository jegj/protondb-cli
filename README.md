[![CI](https://github.com/jegj/protondb-cli/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/jegj/protondb-cli/actions/workflows/build.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

# protondb-cli
A simple CLI for [ProtonDB project](https://www.protondb.com/). Let's face it, if you know about ProtonDB you must love video games and Linux and what better than an CLI for a Linux fan to check your games compatibility.

## How ProtonDB.com works
For more information about how [ProtonDB](https://www.protondb.com/) works, check the [protondb specification](./protondb.md).

## How protondb-cli works
We use the information that you can find out in [ProtonDB web page](https://www.protondb.com/) to emulate the HTTP requests, parse and show the results.
### Limitations
- Keys, id and urls may change in the future. That is why those kind of params can be provided to the CLI. Perhaps in the future there is a better way to support this changes...

## protondb-cli

```
protondb-cli [game]

Search for games based on a key word and show their protondb compatability,
score and any other information related

Positionals:
  game  Game's name. [string] [default: null. protondb-cli Use STDIN by default]

Options:
      --help                           Show help                       [boolean]
      --version                        Show version number             [boolean]
  -v, --verbose                        Run with verbose logging        [boolean]
  -h, --hits                           Limit the number of result on the search
                                                          [number] [default: 10]
  -c, --concurrency                    Limit the concurrency for the search
                                                           [number] [default: 2]
      --algolia_query_url, --aqu       Algolia main URL for the search. Obtain
                                       from https://www.protondb.com/
                                                              [string] [default:
                   "https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query"]
      --algolia_api_key, --aak         Algolia API key. Obtain from
                                       https://www.protondb.com/
                          [string] [default: "9ba0e69fb2974316cdaec8f5f257088f"]
      --algolia_application_id, --aai  Algolia application id. Obtain from
                                       https://www.protondb.com/
                                                [string] [default: "94HE6YATEI"]
      --protondb_url, --pu             Protondb url for search game information.
                                       Obtain from https://www.protondb.com/
         [string] [default: "https://www.protondb.com/api/v1/reports/summaries"]

Examples:
  protondb-cli gta --concurrency 5 --hits   Search the last 15 like gta using an
  15                                        conccurency of 5
```

## Docker Support

### Run from Docker

### Build

```sh
$ docker build -t protondb-cli .

$ docker run -it --rm protondb-cli:latest "Skyrim"
```

<!-- https://tonylixu.medium.com/gitops-github-actions-docker-build-workflow-157cc53e9a0d -->
