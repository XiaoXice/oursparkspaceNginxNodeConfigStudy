//index.js
//获取应用实例
const app = getApp()
var wechat = require('../../utils/wechat.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  successToLogin: function() {
    wechat.getCryptoData2()
      .then(data => {
        return wechat.getMyData(data);
      })
      .then(data => {
        app.globalData.userInfo._id = data.data._id;
        wx.redirectTo({
          url: '../logs/logs',
        })
      })
      .catch(console.err);
  },
  onLoad: function() {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.successToLogin();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.successToLogin();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.successToLogin();
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.successToLogin();
  }
})