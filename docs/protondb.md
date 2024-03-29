# ProtonDB

ProtonDB web page use two API sources for list the game ranking and
provide the calification for the game:

- `algolia.net`
        - Provides the ranking list but needs the following `keys` in the HTTP requests
          -  `x-alogilia-api-key`
          -  `x-algilia-application-id`
        - Return a list of hits, each one of them has a `objectId` which
    is required to get the protondb clasification
- `protondb.com`
        - This API return the game's calification based on
     the `objectId` from the previous request

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

## Caching

ProtonDB use Etags for the resources which create a opportunity for caching resource
from the ProtonDB API.The idea is simple, store the resource by Etag an
objectId in a local file(`~/.config`) and send it in the request

Example of request using Etag in `If-None-Match` header

```sh
curl --location --request GET 'https://www.protondb.com/api/v1/reports/summaries/1372090.json' \
--header 'authority: www.protondb.com' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cookie: browserid=2984237732438315040' \
--header 'referer: https://www.protondb.com/search?q=cyberpunk' \
--header 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "Linux"' \
--header 'sec-fetch-dest: empty' \
--header 'sec-fetch-mode: cors' \
--header 'sec-fetch-site: same-origin' \
--header 'sec-gpc: 1' \
--header 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
--header 'If-None-Match: "01b384c6f71d9a2f86a1bddd203a7397-ssl"'
```
