// pages/mine/mine.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recentCount: 0,
    likeCount: 0,
    collectCount: 0
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
    var recentData = wx.getStorageSync("music_recent")
    var likeData = wx.getStorageSync("music_like")
    var collectData = wx.getStorageSync("music_collect")
    if (recentData) {
      this.setData({
        recentCount: recentData.length
      })
    }
    if (collectData) {
      this.setData({
        likeCount: collectData.length
      })
    }
    if (collectData) {
      this.setData({
        collectCount: collectData.length
      })
    }
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
      title: '邀您进入音乐的世界',
      path: '/pages/index/index'
    }
  },

  clearStorage: function() {
    wx.showModal({
      title: '提示',
      content: '清除缓存将删除所有记录,包括喜欢的歌曲及收藏的歌单等,是否继续?',
      success(res) {
        if (res.confirm) {
          wx.clearStorage()
          wx.clearStorageSync()
          wx.showToast({
            title: '已清除缓存!',
            icon: 'success',
            duration: 1000
          })
        } else if (res.cancel) {}
      }
    })
  }
})