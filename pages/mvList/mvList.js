// pages/mvList/mvList.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvs: null,
    offset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this
    wx.request({
      url: server.mv_list + "&offset=0",
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            mvs: res.data.data
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
    var _that = this,
      _offset = _that.data.offset + 10;
    _that.setData({
      loading: true
    })
    wx.request({
      url: server.mv_list + "&offset=" + _offset,
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            mvs: _that.data.mvs.concat(res.data.data),
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

  gotoVideoPlay: function (e) {
    wx.navigateTo({
      url: '/pages/videoPlay/videoPlay?id=' + e.currentTarget.dataset.id
    })
  }
})