// pages/songList/songList.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    songList: null,
    offset: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this
    var _order = options.order
    var _url
    if (_order == 'new') {
      _url = server.song_list + "&offset=0&order=" + _order
      wx.setNavigationBarTitle({
        title: '最新歌单'
      })
    } else if (_order == 'hot') {
      _url = server.song_list + "&offset=0&order=" + _order
      wx.setNavigationBarTitle({
        title: '热门歌单'
      })
    } else {
      _url = server.song_boutList
      wx.setNavigationBarTitle({
        title: '精品歌单'
      })
    }
    _that.setData({
      order: _order
    })
    wx.request({
      url: _url,
      success: function(res) {
        if (res.data.code == 200) {
          if ("bou" == _order) {
            _that.setData({
              songList: res.data.data.playlists
            })
          } else {
            _that.setData({
              songList: res.data.data
            })
          }
        }
      }
    })
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
    if ("bou" == this.data.order) {
      return
    }
    var _that = this,
      _order = _that.data.order,
      _offset = _that.data.offset + 10;
    _that.setData({
      loading: true
    })
    wx.request({
      url: server.song_list + "&offset=" + _offset + "&order=" + _order,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            songList: _that.data.songList.concat(res.data.data),
            offset: _offset,
            loading: false
          })
        }
      }
    })
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

  gotoMusicList:function(e){
    wx.navigateTo({
      url: '/pages/musicList/musicList?id=' + e.currentTarget.dataset.id
    })
  }
})