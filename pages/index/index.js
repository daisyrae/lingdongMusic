//index.js
const app = getApp()
const server = require('../../utils/server.js')
const util = require('../../utils/util.js')
Page({

  data: {
    categorys: [{
        name: '最新歌单',
        word: 'New',
        desc: '云音乐',
        icon: 'new',
        color: 'red',
        order: 'new'
      },
      {
        name: '热门歌单',
        word: 'Hot',
        desc: '云音乐',
        icon: 'hot',
        color: 'orange',
        order: 'hot'
      },
      {
        name: '精品歌单',
        word: 'Boutique',
        desc: '云音乐',
        icon: 'choiceness',
        color: 'pink',
        order: 'bou'
      }
    ],
    songList: null,
    songs: null
  },

  onLoad: function() {
    var _that = this
    wx.request({
      url: server.index_song,
      success: function(res) {
        if (res.data.code == 200) {
          var _songs = []
          //首页推荐拿5首
          for (var i = 0; i < 5; i++) {
            _songs[i] = res.data.data.songs[i]
            _songs[i].long = util.formatSeconds(_songs[i].time)
          }
          _that.setData({
            songList: res.data.data,
            songs: _songs
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _playData = wx.getStorageSync('music_play_data')
    if (_playData && _playData.playing) {
      this.setData({
        playing: true
      })
    } else {
      this.setData({
        playing: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '邀您聆听好音乐',
      path: '/pages/index/index'
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var _that = this
    _that.setData({
      loading: true
    })
    setTimeout(function() {
      _that.onLoad()
      _that.setData({
        loading: false,
      })
    }, 500);
    wx.stopPullDownRefresh()
  },

  gotoAudioPlay: function(e) {
    var _songListId = e.currentTarget.dataset.songlistid
    var _songIndex = e.currentTarget.dataset.songindex
    var _songId = e.currentTarget.dataset.songid
    wx.navigateTo({
      url: '/pages/audioPlay/audioPlay?songListId=' + _songListId + "&songIndex=" + _songIndex + "&songId=" + _songId
    })
  },

  gotoSongList: function(e) {
    wx.navigateTo({
      url: '/pages/songList/songList?order=' + e.currentTarget.dataset.order
    })
  },

  gotoMusicList: function(e) {
    wx.navigateTo({
      url: '/pages/musicList/musicList?id=' + e.currentTarget.dataset.id
    })
  },

  gotoAudioPlayer: function(e) {
    var _playData = wx.getStorageSync('music_play_data')
    if (_playData) {
      var _songListId = _playData.songListId
      var _songIndex = _playData.songIndex
      var _songId = _playData.songId
      wx.navigateTo({
        url: '/pages/audioPlay/audioPlay?songListId=' + _songListId + "&songIndex=" + _songIndex + "&songId=" + _songId
      })
    } else {
      wx.showToast({
        title: '当前无音乐播放!',
        icon: 'none',
        duration: 1000
      })
    }
  }
})