# ProtonDB

ProtonDB web page use two API sources for list the game ranking and
provide the calification for the game:

- `algolia.net`
    - Provides the ranking list but needs the following `keys` in the HTTP requests
      -  `x-alogilia-api-key`: e.g 9ba0e69fb2974316cdaec8f5f257088f
      -  `x-algilia-application-id`: e.g 94HE6YATEI
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
