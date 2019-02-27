// pages/audioPlay/audioPlay.js
const app = getApp()
const server = require('../../utils/server.js')
const util = require('../../utils/util.js')
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: null,
    song: null,
    songIndex: null,
    songId: null,
    songListId: null,
    playing: false,
    playMode: "loop",
    //文稿数组，转化完成用来在wxml中使用
    lrcContent: [],
    //文稿滚动距离
    marginTop: 0,
    //当前正在第几行
    lrcIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _songListId = options.songListId,
      _songIndex = options.songIndex,
      _songId = options.songId,
      _that = this;
    _that.setData({
      songIndex: _songIndex,
      songId: _songId,
      songListId: _songListId
    })
    //判断是否搜索单曲进入
    if (_songListId == '111') {
      //清除缓存
      wx.removeStorageSync('music_play_data')
      wx.request({
        url: server.music_detail + "&id=" + _songId,
        success: function(res) {
          if (res.data.code == 200) {
            var _song = res.data.data
            _song.long = util.formatSeconds(_song.time)
            _song.nowTime = 0
            _song.nowLong = "00:00"
            _that.setData({
              songs: [_song],
              song: _song,
              playMode: "one"
            })
            _that.playSong()
          }
        }
      })
      return
    }
    //判断是否播放缓存
    var _playData = wx.getStorageSync('music_play_data')
    if (_playData && _playData.songId && _playData.songId == _songId) {
      _that.setData(_playData)
      if (_playData.playing) {
        backgroundAudioManager.play()
      }
      _that.listenAudioManager(_that)
      return
    }
    //先清除缓存
    wx.removeStorageSync('music_play_data')
    wx.request({
      url: server.songList_detail + "&id=" + _songListId,
      success: function(res) {
        if (res.data.code == 200) {
          var _songs = res.data.data.songs
          for (var i in _songs) {
            _songs[i].long = util.formatSeconds(_songs[i].time)
            _songs[i].nowTime = 0
            _songs[i].nowLong = "00:00"
          }
          _that.setData({
            songs: _songs,
            song: _songs[_songIndex]
          })
        }
        _that.playSong()
      }
    })
  },

  //播放音乐
  playSong: function() {
    var _that = this,
      _songIndex = _that.data.songIndex,
      _song = _that.data.songs[_songIndex];
    _that.setData({
      song: _song
    })
    //开始播放
    backgroundAudioManager.title = _song.name
    backgroundAudioManager.singer = _song.singer
    backgroundAudioManager.coverImgUrl = _song.pic
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = _song.url
    backgroundAudioManager.play()
    _that.setData({
      playing: true
    })
    //播放歌词
    // _that.playLrc(_that)
    _that.listenAudioManager(_that)
  },

  //歌词展示
  playLrc: function(_that) {
    var _lrcUrl = _that.data.song.lrc
    wx.request({
      url: _lrcUrl,
      success: function(res) {
        var _songLrc = res.data
        _that.setData({
          lrcIndex: 0,
          marginTop: 0,
          lrcContent: _that.sliceNull(_that.parseLyric(_songLrc))
        })
        if (res.data.code == 200) {

        }
      }
    })
  },

  listenAudioManager: function(_that) {
    backgroundAudioManager.onTimeUpdate((e) => {
      var _nowTime = parseInt(backgroundAudioManager.currentTime)
      var _song = _that.data.song
      _song.nowTime = _nowTime
      _song.nowLong = util.formatSeconds(_nowTime)
      _that.setData({
        song: _song,
      })

      // //歌词滚动效果
      // if (_that.data.lrcIndex >= 3) { //超过6行开始滚动
      //   _that.setData({
      //     marginTop: (_that.data.lrcIndex - 3) * 30
      //   })
      // }
      // // 文稿对应行颜色改变
      // if (_that.data.lrcIndex != _that.data.lrcContent.length - 1) { //
      //   var j = 0;
      //   for (var j = _that.data.lrcIndex; j < _that.data.lrcContent.length; j++) {
      //     // 当前时间与前一行，后一行时间作比较， j:代表当前行数
      //     if (_that.data.lrcIndex == _that.data.lrcContent.length - 2) {
      //       //最后一行只能与前一行时间比较
      //       if (parseFloat(backgroundAudioManager.currentTime) > parseFloat(_that.data.lrcContent[_that.data.lrcContent.length - 1][0])) {
      //         _that.setData({
      //           lrcIndex: _that.data.lrcContent.length - 1
      //         })
      //         return;
      //       }
      //     } else {
      //       if (parseFloat(backgroundAudioManager.currentTime) > parseFloat(_that.data.lrcContent[j][0]) && parseFloat(backgroundAudioManager.currentTime) < parseFloat(_that.data.lrcContent[j + 1][0])) {
      //         _that.setData({
      //           lrcIndex: j
      //         })
      //         return;
      //       }
      //     }
      //   }
      // }


    })
    //监听循环模式
    backgroundAudioManager.onEnded((e) => {
      if (_that.data.playMode == 'loop') {
        _that.playNext()
      } else if (_that.data.playMode == 'all') {
        if (_that.data.songIndex < (parseInt(_that.data.songs.length) - 1)) {
          _that.playNext()
        }
      } else {
        backgroundAudioManager.stop()
        _that.playSong()
      }
    })
    //监听系统后台上下一首
    backgroundAudioManager.onNext((e) => {
      _that.playNext()
    })
    backgroundAudioManager.onPrev((e) => {
      _that.playPrev()
    })
    //监听暂停
    backgroundAudioManager.onPause((e) => {
      _that.stopSong()
      var _playData = wx.getStorageSync('music_play_data')
      if (_playData) {
        _playData.playing = false
        wx.setStorageSync('music_play_data', _playData)
      }
    })
    //监听播放
    backgroundAudioManager.onPlay((e) => {
      _that.setData({
        playing: true
      })
      var _playData = wx.getStorageSync('music_play_data')
      if (_playData) {
        _playData.playing = true
        wx.setStorageSync('music_play_data', _playData)
      }
    })
  },

  //快进快退
  sliderChange: function(e) {
    backgroundAudioManager.seek(e.detail.value)
  },

  //暂停播放
  stopSong: function() {
    var _that = this
    backgroundAudioManager.pause()
    _that.setData({
      playing: false
    })
  },

  //切换播放状态
  switchPlay: function() {
    var _that = this,
      _playing = _that.data.playing;
    if (_playing) {
      _that.stopSong()
    } else {
      backgroundAudioManager.play()
    }
    _that.setData({
      playing: !_playing
    })
  },

  //播放上一首
  playPrev: function(e) {
    backgroundAudioManager.stop()
    var _that = this,
      _songIndex = _that.data.songIndex;
    if (0 == _songIndex) {
      _songIndex = parseInt(_that.data.songs.length) - 1
    } else {
      _songIndex = parseInt(_songIndex) - 1
    }
    _that.setData({
      songIndex: _songIndex
    })
    _that.playSong()
  },

  //播放下一首
  playNext: function(e) {
    backgroundAudioManager.stop()
    var _that = this,
      _songIndex = _that.data.songIndex,
      _songsLength = parseInt(_that.data.songs.length) - 1;
    if (_songsLength == _songIndex) {
      _songIndex = 0
    } else {
      _songIndex = parseInt(_songIndex) + 1
    }
    _that.setData({
      songIndex: _songIndex
    })
    _that.playSong()
  },

  //切换播放模式
  changePlayMode: function(e) {
    var _that = this,
      _playMode = _that.data.playMode;
    if (_that.data.songListId == '111') {
      return
    }
    var _newMode
    if (_playMode == 'loop') {
      _newMode = 'all'
    } else if (_playMode == 'all') {
      _newMode = 'one'
    } else {
      _newMode = 'loop'
    }
    _that.setData({
      playMode: _newMode
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
    //设置缓存
    wx.setStorageSync('music_play_data', this.data)
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
    var _that = this,
      _songListId = _that.data.songListId,
      _songIndex = _that.data.songIndex,
      _songId = _that.data.songId;
    return {
      title: '好听的音乐分享给你',
      path: '/pages/audioPlay/audioPlay?songListId=' + _songListId + "&songIndex=" + _songIndex + "&songId=" + _songId
    }
  },

  previewImg: function(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url]
    })
  },

  //喜欢并收藏
  gotoHomeIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  //展示列表
  showModalList: function() {
    this.setData({
      modalShow: true
    })
  },

  //隐藏列表
  hideModalList: function() {
    this.setData({
      modalShow: false
    })
  },

  //列表曲目点击事件
  playItemSong: function(e) {
    var _that = this,
      _songIndex = _that.data.songIndex,
      _index = e.currentTarget.dataset.index;
    if (_songIndex == _index) {
      _that.switchPlay()
    } else {
      _that.setData({
        songIndex: _index
      })
      _that.playSong()
    }
  },

  playAllSongs: function(e) {
    if (this.data.songListId == '111') {
      return
    }
    this.setData({
      songIndex: 0
    })
    this.playSong()
  },

  doNothing: function() {},

  //格式化歌词
  parseLyric: function(text) {
    var result = [];
    var lines = text.split('\n'), //切割每一行
      pattern = /\[\d{2}:\d{2}.\d{2}\]/g; //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    };
    //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function(v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
      return a[0] - b[0];
    });
    return result;
  },

  //去除空白
  sliceNull: function(lrc) {
    var result = []
    for (var i = 0; i < lrc.length; i++) {
      if (lrc[i][1] == "") {} else {
        result.push(lrc[i]);
      }
    }
    return result
  }
})