const base_url = "https://api.bzqll.com";

const index_song = base_url + "/music/netease/songList?key=579621905&id=2884035&limit=10&offset=0";
const index_mv = base_url + "/music/netease/topMvList?key=579621905&limit=5&offset=0";
const song_list = base_url + "/music/netease/hotSongList?key=579621905&cat=全部&limit=10";
const song_boutList = base_url + "/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100";
const mv_list = base_url + "/music/netease/topMvList?key=579621905&limit=10";
const mv_detail = base_url + "/music/netease/mv?key=579621905";
const songList_detail = base_url + "/music/netease/songList?key=579621905&limit=100&offset=0";
const base_search = base_url + "/music/netease/search?key=579621905&limit=10";
const music_detail = base_url + "/music/netease/song?key=579621905";
const user_search = base_url + "/music/netease/search?key=579621905&limit=10";
const user_songList = base_url + "/music/netease/userSongList?key=579621905";
const albumList_detail = base_url + "/music/netease/album?key=579621905";


module.exports = {
  index_song: index_song,
  index_mv: index_mv,
  song_list: song_list,
  song_boutList: song_boutList,
  mv_list: mv_list,
  mv_detail: mv_detail,
  songList_detail: songList_detail,
  base_search: base_search,
  music_detail: music_detail,
  user_search: user_search,
  user_songList: user_songList,
  albumList_detail: albumList_detail
}