// pages/search/search.js
const app = getApp()
const server = require('../../utils/server.js')
const contant = require('../../utils/contant.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    tabIndex: 0,
    tabs: ['音乐', '歌手', '专辑', '歌单', '视频'],
    songs: [],
    songOffset: 0,
    singers: [],
    singerOffset: 0,
    albums: [],
    albumOffset: 0,
    lists: [],
    listOffset: 0,
    videos: [],
    videoOffset: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var _that = this,
      _key = _that.data.key.trim(),
      _tabIndex = _that.data.tabIndex
    if (_key) {
      _that.setData({
        loading: true
      })
      switch (_tabIndex) {
        case 0:
          _that.searchSong(_key, _that.data.songOffset)
          break;
        case 1:
          _that.searchSinger(_key, _that.data.singerOffset)
          break;
        case 2:
          _that.searchAlbum(_key, _that.data.albumOffset)
          break;
        case 3:
          _that.searchList(_key, _that.data.listOffset)
          break;
        case 4:
          _that.searchVideo(_key, _that.data.videoOffset)
          break;
      }
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

  switchTab: function(e) {
    var _tabIndex = e.currentTarget.dataset.index,
      _that = this,
      _key = _that.data.key.trim();
    _that.setData({
      tabIndex: _tabIndex
    })
    if (_key) {
      _that.setData({
        loading: true
      })
      switch (_tabIndex) {
        case 0:
          _that.setData({
            songs: []
          })
          _that.searchSong(_key, 0)
          break;
        case 1:
          _that.setData({
            singers: []
          })
          _that.searchSinger(_key, 0)
          break;
        case 2:
          _that.setData({
            albums: []
          })
          _that.searchAlbum(_key, 0)
          break;
        case 3:
          _that.setData({
            lists: []
          })
          _that.searchList(_key, 0)
          break;
        case 4:
          _that.setData({
            videos: []
          })
          _that.searchVideo(_key, 0)
          break;
      }
    }
  },

  saveKey: function(e) {
    this.setData({
      key: e.detail.value
    })
  },

  searchByKey: function(e) {
    var _that = this,
      _key = _that.data.key.trim(),
      _tabIndex = _that.data.tabIndex;
    if (_key) {
      _that.setData({
        loading: true
      })
      switch (_tabIndex) {
        case 0:
          _that.setData({
            songs: []
          })
          _that.searchSong(_key, 0)
          break;
        case 1:
          _that.setData({
            singers: []
          })
          _that.searchSinger(_key, 0)
          break;
        case 2:
          _that.setData({
            albums: []
          })
          _that.searchAlbum(_key, 0)
          break;
        case 3:
          _that.setData({
            lists: []
          })
          _that.searchList(_key, 0)
          break;
        case 4:
          _that.setData({
            videos: []
          })
          _that.searchVideo(_key, 0)
          break;
      }
    } else {
      _that.setData({
        key: ''
      })
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 1000
      })
    }
  },

  searchSong: function(_key, _offset) {
    var _that = this
    wx.request({
      url: server.base_search + "&s=" + _key + "&type=song&offset=" + _offset,
      success: function(res) {
        if (res.data.code == 200) {
          var _songs = res.data.data
          for (var i in _songs) {
            _songs[i].long = util.formatSeconds(_songs[i].time)
          }
          _that.setData({
            songs: _that.data.songs.concat(_songs),
            songOffset: _offset + 10,
            loading: false
          })
        }
      }
    })
  },

  searchSinger: function(_key, _offset) {
    var _that = this
    wx.request({
      url: server.base_search + "&s=" + _key + "&type=singer&offset=" + _offset,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            singers: _that.data.singers.concat(res.data.data.artists),
            singerOffset: _offset + 10,
            loading: false
          })
        }
      }
    })
  },

  searchAlbum: function(_key, _offset) {
    var _that = this
    wx.request({
      url: server.base_search + "&s=" + _key + "&type=album&offset=" + _offset,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            albums: _that.data.albums.concat(res.data.data.albums),
            albumOffset: _offset + 10,
            loading: false
          })
        }
      }
    })
  },

  searchList: function(_key, _offset) {
    var _that = this
    wx.request({
      url: server.base_search + "&s=" + _key + "&type=list&offset=" + _offset,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            lists: _that.data.lists.concat(res.data.data.playlists),
            listOffset: _offset + 10,
            loading: false
          })
        }
      }
    })
  },

  searchVideo: function(_key, _offset) {
    var _that = this
    wx.request({
      url: server.base_search + "&s=" + _key + "&type=video&offset=" + _offset,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            videos: _that.data.videos.concat(res.data.data.videos),
            videoOffset: _offset + 10,
            loading: false
          })
        }
      }
    })
  },

  gotoAudioPlay: function(e) {
    var _songListId = e.currentTarget.dataset.songlistid
    var _songIndex = e.currentTarget.dataset.songindex
    var _songId = e.currentTarget.dataset.songid
    wx.navigateTo({
      url: '/pages/audioPlay/audioPlay?songListId=' + _songListId + "&songIndex=" + _songIndex + "&songId=" + _songId
    })
  },

  gotoMusicList: function(e) {
    wx.navigateTo({
      url: '/pages/musicList/musicList?id=' + e.currentTarget.dataset.id
    })
  },

  gotoAlbumList: function(e) {
    wx.navigateTo({
      url: '/pages/albumList/albumList?id=' + e.currentTarget.dataset.id
    })
  },

  gotoVideoPlay: function(e) {
    var _index = e.currentTarget.dataset.index,
      _that = this,
      _video = _that.data.videos[_index];
    if (0 == _video.type) {
      wx.navigateTo({
        url: '/pages/videoPlay/videoPlay?id=' + _video.vid
      })
    } else {
      wx.showToast({
        title: '抱歉,该视频暂时无法播放!',
        icon: 'none',
        duration: 1000
      })
    }
  },

  seeSinger:function(e){
    wx.showToast({
      title: '抱歉,暂时无法查看歌手!',
      icon: 'none',
      duration: 1000
    })
  }
})