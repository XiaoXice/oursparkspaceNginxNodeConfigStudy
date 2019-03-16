//logs.js
const wechat = require('../../utils/wechat.js');
var app = getApp();
var page = 1;
var finished = false;
Page({
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    comment_input_value: "",
    comment_btn_disabled: false,
    focus: false,
    comm_input: true,
    input: '',
    btn_disabled: false,
    tab: 1,
    logs: [],
    whether: {
      place: "",
      text: "",
      temperature: ""
    },
    iszan: [],
    zan_list: [],
    cur_comm: -1
  },
  onLoad: function() {
    wechat.getIndexMsgList().then(res => {
      this.setData({
        logs: res.data
      })
    }).catch(err => {
      console.error(err);
    })
    /*
    var test = {
      avatar: getApp().globalData.userInfo.avatarUrl,
      nickName: getApp().globalData.userInfo.nickName,
      content: "啊啥的开始觉得哦",
      zan: new Array(15).fill(getApp().globalData.userInfo.nickName),
      comments: [{
        name: getApp().globalData.userInfo.nickName,
        comment_content: "啊啥的"
      }]
    }
    */

    var that = this

    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=tbshjanlydyxiyog&location=beijing&language=zh-Hans&unit=c',
      data: {},
      success: function(res) {
        console.info("天气接口返回值", res)

        that.setData({
          whether: {
            place: res.data.results[0].location.name,
            text: res.data.results[0].now.text,
            temperature: res.data.results[0].now.temperature
          }
        });

      },
      fail: function(res) {

      }
    })
  },
  //页面滑动到底部
  bindDownLoad: function() {
    console.info("页面滑动到底部");
    if(!finished){
      wx.showLoading({
        title: '加载中'
      });
      page += 1;
      wechat.getIndexMsgList(page).then(res => {
        if(res.data.length == 0){
          finished = true;
          wx.hideLoading();
          wx.showToast({
            title: '没有更多内容了',
            icon: 'none',
            duration: 1000
          });
        }else{
          wx.hideLoading();
          wx.showToast({
            title: `加载了${res.data.length}条信息`,
            icon: 'none',
            duration: 1000
          });
          this.setData({
            logs: this.data.logs.concat(res.data)
          });
        }
      }).catch(err=>{
        wx.hideLoading();
        console.error(err);
      })
    }
  },
  scroll: function(event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function(event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    console.log("页面滑动到顶部的事件，然后做上拉刷新");
    wx.showLoading({
      title: '加载中'
    });
    page = 1;
    finished = false;
    this.setData({
      logs: []
    });
    wechat.getIndexMsgList(page).then(res => {
      this.setData({
        logs: res.data
      });
      wx.hideLoading();
      wx.showToast({
        title: `加载了${res.data.length}条信息`,
        icon: 'none',
        duration: 1000
      });
    }).catch(err => {
      wx.hideLoading()
      console.error(err);
    })
  },
  selectOne: function selectOne() {
    this.setData({
      tab: 1
    });
  },
  selectTwo: function selectTwo() {
    this.setData({
      tab: 2
    });
  },

  formSubmit: function(e) {
    var that = this
    if (e.detail.value.input_content == '') {
      wx.showModal({
        title: '提示',
        content: '输入不能为空',
        success: function success(res) {
          if (res.confirm) {
            console.info('用户点击确定');
          } else if (res.cancel) {
            console.info('用户点击取消');
          }
        }
      });

      return;
    }
    this.setData({
      btn_disabled: true
    });

    wx.showLoading({
      title: '上传中'
    });

    wechat.sendMsg(e.detail.value.input_content).then(res => {
      if (res.statusCode != 201) throw new Error(res);
      wx.hideLoading();

      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000
      });

      that.setData({
        input: '',
        btn_disabled: false
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showModal({
        title: "哎呀~",
        content: err,
      })
      that.setData({
        btn_disabled: false
      });
      console.error(err);
    });
  },

  dianzan: function(e) {
    wx.showLoading({
      title: '处理中'
    });
    var index = e.currentTarget.dataset.index
    if (this.data.logs[index].liked) {
      wechat.disLikeMsg(this.data.logs[index]._id).then(res => {
        if (res.statusCode == 200) {
          wx.hideLoading();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          });
          let indexLike = this.data.logs[index].like.findIndex(liker => liker._id == app.globalData.userInfo._id);
          this.data.logs[index].like.splice(indexLike, 1);
          this.data.logs[index].liked = false;
          this.setData({
            "logs": this.data.logs
          });
          return;
        }
        throw new Error(res);
      }).catch(err => {
        wx.hideLoading();
        wx.showModal({
          title: "哎呀~",
          content: err,
        })
        console.error(err);
      })
    } else {
      wechat.likeMsg(this.data.logs[index]._id).then(res => {
        if (res.statusCode == 201) {
          wx.hideLoading();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          });
          this.data.logs[index].like.unshift(app.globalData.userInfo);
          this.data.logs[index].liked = true;
          this.setData({
            "logs": this.data.logs
          });
          return;
        }
        throw new Error(res);
      }).catch(err => {
        wx.hideLoading();
        wx.showModal({
          title: "哎呀~",
          content: err,
        })
        console.error(err);
      })
    }
  },

  comment: function(e) {
    var index = e.currentTarget.dataset.index
    wechat.getCommitList(this.data.logs[index]._id).then(res => {
      if (res.statusCode == 200) {
        this.data.logs[index] = res.data;
        this.setData({
          logs: this.data.logs,
          focus: true,
          comm_input: false,
          cur_comm: index
        })
        return;
      }
      throw new Error(res);
    }).catch(err => {
      console.error(err);
    })
  },

  blur: function(e) {
    this.setData({
      comm_input: true
    })
  },

  submitComment: function(e) {
    var that = this
    if (e.detail.value.comm_name == '') {
      wx.showModal({
        title: '提示',
        content: '评论不能为空',
        success: function success(res) {
          if (res.confirm) {
            console.info('用户点击确定');
          } else if (res.cancel) {
            console.info('用户点击取消');
          }
        }
      });

      return;
    }
    this.setData({
      comment_btn_disabled: true
    });

    wx.showLoading({
      title: '上传中'
    });
    wechat.addCommit(this.data.logs[this.data.cur_comm]._id, e.detail.value.comm_name)
      .then(res => {
        if (res.statusCode == 201) {
          wx.hideLoading();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          });
          this.data.logs[this.data.cur_comm].commitList.unshift({
            author: app.globalData.userInfo,
            content: e.detail.value.comm_name,
            creationTime: new Date().toISOString(),
            followList: [],
            updateTime: new Date().toISOString(),
            _id: res.data.messageId
          })
          that.setData({
            logs: this.data.logs,
            comment_input_value: '',
            comment_btn_disabled: false
          });
          return;
        }
        throw new Error(res);
      })
      .catch(err => {
        wx.hideLoading();
        wx.showModal({
          title: "哎呀~",
          content: err,
        })
        console.error(err);
        that.setData({
          comment_input_value: '',
          comment_btn_disabled: false
        });
      })
  },
})