// pages/albumList/albumList.js
const app = getApp()
const server = require('../../utils/server.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _id = options.id,
      _that = this;
    wx.request({
      url: server.albumList_detail + "&id=" + _id,
      success: function(res) {
        if (res.data.code == 200) {
          var _songs = res.data.data
          for (var i in _songs) {
            _songs[i].long = util.formatSeconds(_songs[i].time)
          }
          _that.setData({
            songs: _songs
          })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '好听的音乐分享给你',
      path: '/pages/index/index'
    }
  },

  gotoAudioPlay: function(e) {
    var _songListId = e.currentTarget.dataset.songlistid
    var _songIndex = e.currentTarget.dataset.songindex
    var _songId = e.currentTarget.dataset.songid
    wx.navigateTo({
      url: '/pages/audioPlay/audioPlay?songListId=' + _songListId + "&songIndex=" + _songIndex + "&songId=" + _songId
    })
  }
})