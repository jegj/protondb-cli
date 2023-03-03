# ProtonDB

ProtonDB web page use two API sources for list the game ranking and provide the calification for the game:

- `algolia.net`
    - Provides the ranking list but needs the following `keys` in the HTTP requests
      -  `x-alogilia-api-key`: e.g 9ba0e69fb2974316cdaec8f5f257088f
      -  `x-algilia-application-id`: e.g 94HE6YATEI
    - Return a list of hits, each one of them has a `objectId` which is required to get the protondb clasification
- `protondb.com`
    - This API return the game's calification based on the `objectId` from the previous request

```
                                                                                           {
                                                                                            "hits": [
                                                                                              {
                                                                                               "lastUpdated": xxxx,
             ┌────────────────┐                                      ┌────────────────┐        "name": "...",
             │                │                                      │                │        "oslist": [],
             │                │       POST                           │                │        "userScore": xx.xx,
             │  protondb.com  ├──────────────────────────────────────►   algolia.net  │        "followers": yy,
             │                │    x-alogilia-api-key                │                │        "technologies": [],
             │                │    x-algilia-application-id          │                │        "releaseYear": 2009,
             └────────────────┤                                      └────────────────┘        "tags": [],
                              │                                                                "objectId": <objectId>
                              │                                                               }
                              │                                                             ]
                              │                                                            }
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │                                      ┌────────────────────┐
                              │                                      │                    │  {
                              │                                      │                    │   "bestReportedTier": "platinum",
                              └──────────────────────────────────────►  protondb.com/api  │   "confidence": "strong",
  https://www.protondb.com/api/v1/reports/summaries/<objectId>       │                    │   "score": x,
                                                                     │                    │   "tier": "gold",
                                                                     └────────────────────┘   "total": x,
                                                                                              "trendingTier":"platinum"
                                                                                             }
```

<!-- ## Algolia Query
fetch("https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Brave\";v=\"110\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1",
    "x-algolia-api-key": "9ba0e69fb2974316cdaec8f5f257088f",
    "x-algolia-application-id": "94HE6YATEI",
    "Referer": "https://www.protondb.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"query\":\"fifaç\",\"attributesToHighlight\":[],\"attributesToSnippet\":[],\"facets\":[\"tags\"],\"facetFilters\":[[\"appType:Game\"]],\"hitsPerPage\":50,\"attributesToRetrieve\":[\"lastUpdated\",\"name\",\"objectID\",\"followers\",\"oslist\",\"releaseYear\",\"tags\",\"technologies\",\"userScore\"],\"page\":0}",
  "method": "POST"
});


curl 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.0)%3B%20Browser' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Connection: keep-alive' \
  -H 'Origin: https://www.protondb.com' \
  -H 'Referer: https://www.protondb.com/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-GPC: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'x-algolia-api-key: 9ba0e69fb2974316cdaec8f5f257088f' \
  -H 'x-algolia-application-id: 94HE6YATEI' \
  --data-raw '{"query":"acu","attributesToHighlight":[],"attributesToSnippet":[],"facets":["tags"],"facetFilters":[["appType:Game"]],"hitsPerPage":50,"attributesToRetrieve":["lastUpdated","name","objectID","followers","oslist","releaseYear","tags","technologies","userScore"],"page":0}' \
  --compressed

curl 'https://94he6yatei-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.14.3)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.51.1)%3B%20JS%20Helper%20(3.11.3)&x-algolia-api-key=473ed43952f78955d6cf0ea73bc6cc63&x-algolia-application-id=94HE6YATEI' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Origin: https://steamdb.info' \
  -H 'Referer: https://steamdb.info/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-GPC: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  --data-raw '{"requests":[{"indexName":"steamdb","params":"attributesToHighlight=%5B%22name%22%5D&attributesToRetrieve=%5B%22lastUpdated%22%2C%22name%22%2C%22oslist%22%2C%22price_us%22%2C%22releaseYear%22%2C%22userScore%22%5D&facets=%5B%22tags%22%2C%22multiplayerCategories%22%2C%22categories%22%2C%22vrCategories%22%2C%22languages%22%2C%22languagesAudio%22%2C%22languagesSubtitles%22%2C%22technologies%22%2C%22appType%22%2C%22userScore%22%2C%22oslist%22%2C%22developer%22%2C%22publisher%22%2C%22price_us%22%2C%22releaseYear%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=40&maxValuesPerFacet=200&page=0&query=gta&tagFilters="}]}' \
  --compressed

curl 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.0)%3B%20Browser' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Origin: https://www.protondb.com' \
  -H 'Referer: https://www.protondb.com/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-GPC: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'x-algolia-api-key: 9ba0e69fb2974316cdaec8f5f257088f' \
  -H 'x-algolia-application-id: 94HE6YATEI' \
  --data-raw '{"query":"gta","attributesToHighlight":[],"attributesToSnippet":[],"facets":["tags"],"facetFilters":[["appType:Game"]],"hitsPerPage":50,"attributesToRetrieve":["lastUpdated","name","objectID","followers","oslist","releaseYear","tags","technologies","userScore"],"page":0}' \
  --compressed

Get ObjectID


## Protondb Query
https://www.protondb.com/api/v1/reports/summaries/802020.json

curl 'https://www.protondb.com/api/v1/reports/summaries/802020.json' \
  -H 'authority: www.protondb.com' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.5' \
  -H 'cookie: browserid=2798450749121349331; steamCountry=BR%7C594c1452a95f2ca630c287df316e843a' \
  -H 'referer: https://www.protondb.com/search?q=acu' \
  -H 'sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-gpc: 1' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --compressed -->
