const contant_url_p1 = "https://p1.music.126.net";
const contant_url_p2 = "https://p2.music.126.net";

const cloudRankList = [{
  "songListId": "3779629",
  "songListName": "云音乐新歌榜",
  "songListPic": contant_url_p2 + "/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=400y400",
  "songListCount": 100,
  "songListDescription": "用户一周内收听所有新歌排行榜，每日更新。",
  "shortName": "新歌榜",
  "color": "deepred",
  "remind": "每日更新"
}, {
  "songListId": "3778678",
  "songListName": "云音乐热歌榜",
  "songListPic": contant_url_p2 + "/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=400y400",
  "songListCount": 200,
  "songListDescription": "用户一周内收听所有歌曲排行榜，每周四更新。",
  "shortName": "热歌榜",
  "color": "deeporange",
  "remind": "周四更新"
}, {
  "songListId": "19723756",
  "songListName": "云音乐飙升榜",
  "songListPic": contant_url_p2 + "/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=400y400",
  "songListCount": 100,
  "songListDescription": "每天热度上升最快的歌曲，每日更新。",
  "shortName": "飙升榜",
  "color": "deeppink",
  "remind": "每日更新"
}]

const mediaRankList = [{
  "songListId": "991319590",
  "songListName": "江小白YOLO云音乐说唱榜",
  "songListPic": contant_url_p1 + "/TuGxihwbiPmoHoFGvIuu_w==/109951163781770038.jpg?param=400y400",
  "songListCount": 50,
  "songListDescription": "云音乐独立说唱音乐人作品官方榜单，以推荐优秀原创说唱作品，每周五首发。"
}, {
  "songListId": "2629421353",
  "songListName": "以团之名发光榜",
  "songListPic": contant_url_p1 + "/U1V_kWJBqzmHhLyjJliAmQ==/109951163802058449.jpg?param=400y400",
  "songListCount": 29,
  "songListDescription": "网易云音乐重磅推出《以团之名》歌曲官方榜单。云音乐用户一周内收听《以团之名》所有歌曲官方TOP排行榜，每周三更新。"
}, {
  "songListId": "71384707",
  "songListName": "云音乐古典音乐榜",
  "songListPic": contant_url_p1 + "/BzSxoj6O1LQPlFceDn-LKw==/18681802069355169.jpg?param=400y400",
  "songListCount": 100,
  "songListDescription": "云音乐用户一周内收听所有古典音乐官方TOP排行榜，每周四更新。"
}, {
  "songListId": "2534472105",
  "songListName": "国风风云榜",
  "songListPic": contant_url_p1 + "/q089TB8k_QzzB5EiFEMK4Q==/109951163695394339.jpg?param=400y400",
  "songListCount": 86,
  "songListDescription": "网易云音乐重磅推出《国风美少年》官方歌曲榜单。《国风美少年》所有歌曲官方TOP排行榜，每周四更新。"
}, {
  "songListId": "1978921795",
  "songListName": "云音乐电音榜",
  "songListPic": contant_url_p1 + "/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=400y400",
  "songListCount": 50,
  "songListDescription": "云音乐用户一周内收听电子音乐官方TOP排行榜，每周五更新"
}, {
  "songListId": "2250011882",
  "songListName": "抖音排行榜",
  "songListPic": contant_url_p2 + "/bZvjH5KTuvAT0YXlVa-RtQ==/109951163326845001.jpg?param=400y400",
  "songListCount": 97,
  "songListDescription": "来自抖音的官方热歌排行"
}, {
  "songListId": "71385702",
  "songListName": "云音乐ACG音乐榜",
  "songListPic": contant_url_p2 + "/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=400y400",
  "songListCount": 100,
  "songListDescription": "云音乐用户一周内收听所有ACG音乐官方TOP排行榜，每周四更新。"
}, {
  "songListId": "745956260",
  "songListName": "云音乐韩语榜",
  "songListPic": contant_url_p2 + "/vs-cMh49e6qPEorHuhU07A==/18737877162497499.jpg?param=400y400",
  "songListCount": 100,
  "songListDescription": "云音乐用户一周内收听所有韩语歌曲官方TOP排行榜，每周一更新。"
}, {
  "songListId": "10520166",
  "songListName": "云音乐国电榜",
  "songListPic": contant_url_p1 + "/8-GBrukQ3BHhs4CmK6qE4w==/109951163424197392.jpg?param=400y400",
  "songListCount": 20,
  "songListDescription": "每周五为大家带来网易电子音乐人优质新作！"
}, {
  "songListId": "2023401535",
  "songListName": "英国Q杂志中文版周榜",
  "songListPic": contant_url_p2 + "/0_6_Efe9m0D0NtghOxinUg==/109951163089272193.jpg?param=400y400",
  "songListCount": 20,
  "songListDescription": "英国权威音乐杂志《Q》中文版&网易云音乐联合呈现榜单TOP20，英国《Q》杂志权威推荐。每周三同步更新。"
}, {
  "songListId": "2006508653",
  "songListName": "电竞音乐榜",
  "songListPic": contant_url_p1 + "/CUqQp33MZf_m0BwH4u0V6A==/109951163078922993.jpg?param=400y400",
  "songListCount": 50,
  "songListDescription": "无音乐，不游戏。人气电竞主播联手推荐，最热最潮电竞歌曲榜单，电竞迷们的必备收藏！"
}, {
  "songListId": "180106",
  "songListName": "UK排行榜周榜",
  "songListPic": contant_url_p1 + "/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=400y400",
  "songListCount": 96,
  "songListDescription": "UK排行榜"
}, {
  "songListId": "60198",
  "songListName": "美国Billboard周榜",
  "songListPic": contant_url_p1 + "/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=400y400",
  "songListCount": 99,
  "songListDescription": "美国Billboard排行榜"
}, {
  "songListId": "3812895",
  "songListName": "Beatport全球电子舞曲榜",
  "songListPic": contant_url_p2 + "/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=400y400",
  "songListCount": 74,
  "songListDescription": "Beatport全球电子舞曲排行榜TOP100（本榜每周四更新）"
}, {
  "songListId": "27135204",
  "songListName": "法国 NRJ Vos Hits 周榜",
  "songListPic": contant_url_p1 + "/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=400y400",
  "songListCount": 18,
  "songListDescription": "此榜单针对NRJ电台法国本土热门歌曲排行。【每周五更新】"
}, {
  "songListId": "21845217",
  "songListName": "KTV唛榜",
  "songListPic": contant_url_p1 + "/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=400y400",
  "songListCount": 20,
  "songListDescription": "为了保证信息的及时性，唛榜每周五更新。提供给K迷们最新和最准确的数据。"
}, {
  "songListId": "11641012",
  "songListName": "iTunes榜",
  "songListPic": contant_url_p2 + "/WTpbsVfxeB6qDs_3_rnQtg==/109951163601178881.jpg?param=400y400",
  "songListCount": 96,
  "songListDescription": "iTunes榜Top100"
}, {
  "songListId": "60131",
  "songListName": "日本Oricon周榜",
  "songListPic": contant_url_p1 + "/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=400y400",
  "songListCount": 35,
  "songListDescription": "ORICONSTYLE CD单曲周榜，每周三更新，欢迎关注。"
}, {
  "songListId": "120001",
  "songListName": "Hit FM Top榜",
  "songListPic": contant_url_p1 + "/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=400y400",
  "songListCount": 20,
  "songListDescription": "Hit FM Top 20 Countdown 第36期"
}, {
  "songListId": "112463",
  "songListName": "台湾Hito排行榜",
  "songListPic": contant_url_p1 + "/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=400y400",
  "songListCount": 7,
  "songListDescription": "資料來源統計： ※唱片行銷售量佔20%(含玫瑰大眾、g-music、五大、佳佳、博客來等各大唱片行) ※數位音樂下載佔30%(含 iTunes、KK box、myMusic、Omusic、各鈴聲下載榜) ※Hit Fm聯播網AIR PLAY電台播出率佔50%"
}, {
  "songListId": "10169002",
  "songListName": "香港电台中文歌曲龙虎榜",
  "songListPic": contant_url_p1 + "/YQsr07nkdkOyZrlAkf0SHA==/18976471183805915.jpg?param=400y400",
  "songListCount": 11,
  "songListDescription": ""
}, {
  "songListId": "2617766278",
  "songListName": "新声榜",
  "songListPic": contant_url_p2 + "/XbjRDARP1xv5a-40ZDOy6A==/109951163785427934.jpg?param=400y400",
  "songListCount": 20,
  "songListDescription": "LOOK直播-《LOOK新声代》活动官方榜单，旨在推介活动榜单人气热单和隐藏良曲。"
}]

module.exports = {
  cloudRankList: cloudRankList,
  mediaRankList: mediaRankList
}