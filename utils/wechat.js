/**
 * Promise化小程序接口
 */
class Wechat {
  static cookie;
  /**
   * 登陆
   * @return {Promise} 
   */
  static login() {
    return new Promise((resolve, reject) => wx.login({
      success: resolve,
      fail: reject
    }));
  };

  /**
   * 获取用户信息
   * @return {Promise} 
   */
  static getUserInfo() {
    return new Promise((resolve, reject) => wx.getUserInfo({
      success: resolve,
      fail: reject
    }));
  };

  /**
   * 发起网络请求
   * @param {string} url  
   * @param {object} params 
   * @return {Promise} 
   */
  static request(url, params, method = "GET", type = "json") {
    console.info("向后端传递的参数", params);
    return new Promise((resolve, reject) => {
      if (this.cookie == null) {
        this.cookie = wx.getStorageSync("sessionid");
      }
      let header = {
        'Content-Type': type
      }
      if (this.cookie != "") {
        header["Cookie"] = this.cookie;
      }
      let flashCookie = data => {
        console.info("后端返回的信息", data);
        let cookie = data.header["Set-Cookie"];
        if (cookie) {
          wx.setStorageSync("sessionid", cookie.split(";")[0]);
          this.cookie = cookie;
        }
        return resolve(data);
      };
      let opts = {
        url: url,
        data: Object.assign({}, params),
        method: method,
        header: header,
        success: flashCookie,
        fail: reject
      }
      console.info("请求的URL", opts.url);
      wx.request(opts);
    });
  };

  /**
   * 获取微信数据,传递给后端
   */
  static getCryptoData() {
    let code = "";
    return this.login()
      .then(data => {
        code = data.code;
        console.info("login接口获取的code:", code);
        return this.getUserInfo();
      })
      .then(data => {
        console.info("getUserInfo接口", data);
        let obj = {
          js_code: code,
        };
        return Promise.resolve(obj);
      })
      .catch(e => {
        console.error(e);
        return Promise.reject(e);
      })
  };
  static getCryptoData2() {
    let code = "";
    return this.login()
      .then(data => {
        code = data.code;
        console.info("login接口获取的code:", code);
        return this.getUserInfo();
      })
      .then(data => {
        console.info("getUserInfo接口", data);
        let {
          encryptedData,
          iv,
          rawData,
          signature
        } = data;
        let obj = {
          js_code: code,
          rawData,
          signature,
          encryptedData,
          iv
        };
        return Promise.resolve(obj);
      })
      .catch(e => {
        console.error(e);
        return Promise.reject(e);
      })
  };
  static baseUrl = "http://127.0.0.1:3000";
  /**
   * 从后端获取openid
   * @param {object} params 
   */
  static getMyData(params) {
    let url = `${this.baseUrl}/login`;
    return this.request(url, params, "POST", "application/x-www-form-urlencoded");
  };
  /**
   * 向后端提交留言
   * @param {String} content
   */
  static sendMsg(content) {
    let url = `${this.baseUrl}/message`;
    return this.request(url, {
      content
    }, "POST", "application/x-www-form-urlencoded");
  };
  /**
   * 获取后端信息列表
   * @param {Number} page
   */
  static getIndexMsgList(page) {
    let url = `${this.baseUrl}/message`;
    if (page) url += `?page=${page}`;
    return this.request(url, null, "GET");
  };
  /**
   * 点赞
   * @param {String} msgId
   */
  static likeMsg(msgId) {
    let url = `${this.baseUrl}/message/${msgId}/like`
    return this.request(url, null, "POST");
  };
  /**
   * 取消点赞
   * @param {String} msgId
   */
  static disLikeMsg(msgId) {
    let url = `${this.baseUrl}/message/${msgId}/like`
    return this.request(url, null, "DELETE");
  };
  /**
   * commit 加载
   * @param {String} msgId
   */
  static getCommitList(msgId) {
    let url = `${this.baseUrl}/message/${msgId}/commit`
    return this.request(url, null, "GET");
  }
  /**
   * 添加评论
   * @param {String} msgId
   * @param {String} content
   */
  static addCommit(msgId, content) {
    let url = `${this.baseUrl}/message/${msgId}/commit`;
    return this.request(url, {
      content
    }, "POST", "application/x-www-form-urlencoded");
  }
}
module.exports = Wechat;