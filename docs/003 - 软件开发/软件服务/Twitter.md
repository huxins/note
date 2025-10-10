# Twitter

## 搜索技巧

合理使用规则和过滤能有效提高搜索效率。

> - [Rules and filtering](https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/search-operators)

| 输入内容                 | 搜索运算                                  |
| ------------------------ | ----------------------------------------- |
| 云南 天空之城            | 同时包含两者                              |
| "云南的天空之城"         | 完全包含                                  |
| 云南 OR 天空之城         | 包含其中一个或者两个                      |
| 天空之城 -云南           | 不包含"云南"                              |
| #天空                    | 包含主题标签                              |
| from:yua_mikami          | 搜索特定用户的推文                        |
| list:esa/astronauts      | 搜索特定列表的推文                        |
| to:yua_mikami            | 搜索回复特定用户的推文                    |
| @yua_mikami              | 搜索提及特定用户的推文                    |
| 瀑布 filter:media        | 包含"瀑布"，并附有图片或视频              |
| 瀑布 -filter:retweets    | 包含"瀑布"，过滤掉转发                    |
| 瀑布 filter:native_video | 包含"瀑布"，并附有上传的视频              |
| 瀑布 filter:periscope    | 包含"瀑布"，并附有一个 Periscope 视频 URL |
| 瀑布 filter:images       | 包含"瀑布"，并附有标识为照片的链接        |
| 瀑布 since:2015-12-21    | 包含"瀑布"，且发送日期为 "2015-12-21"     |
| 瀑布 until:2015-12-21    | 包含"瀑布"，且发送日期早于 "2015-12-21"   |

