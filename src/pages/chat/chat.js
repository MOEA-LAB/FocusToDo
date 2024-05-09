const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

let socketOpen = false;
let socketMsgQueue = [];
let lineCount = Math.floor(windowWidth / 16) - 6;
let curAnsCount = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = [{
    speaker: 'server',
    contentType: 'text',
    content: '你好，我是人工智能助手，请问有什么可以帮你？'
  }];
  that.setData({
    msgList,
    inputVal
  });
}

function sendSocketMessage(msg) {
  if (socketOpen) {
    wx.sendSocketMessage({
      data: msg
    });
  } else {
    socketMsgQueue.push(msg);
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this);
    this.setData({
      cusHeadIcon: "/image/head3.png",
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.connectSocket();
    // wx.onSocketOpen((res) => {
    //   socketOpen = true;
    //   console.log("打开socket");
    //   wx.showToast({
    //     icon: 'none',
    //     title: '会话建立成功',
    //     duration: 500
    //   });
    //   socketMsgQueue = [];
    //   wx.onSocketMessage((result) => {
    //     result.data = result.data.replace(" ", "&nbsp;");
    //     console.log(result.data);
    //     curAnsCount++;
    //     if (curAnsCount % lineCount == 0) {
    //       wx.createSelectorQuery().select('#chatPage').boundingClientRect(function (rect) {
    //         // 使页面滚动到底部
    //         wx.pageScrollTo({
    //           scrollTop: rect.bottom
    //         });
    //       }).exec();
    //     }
    //     msgList[msgList.length - 1].content = msgList[msgList.length - 1].content + result.data;
    //     this.setData({
    //       msgList
    //     });
    //   });
    // });
  },


  onHide: function () {
    wx.closeSocket();
    wx.onSocketClose((result) => {
      console.log("socket关闭成功");
      wx.showToast({
        icon: 'none',
        title: '会话关闭成功',
        duration: 500
      });
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 获取聚焦
   */
  focus: function (e) {
    let res = wx.getSystemInfoSync();
    let navBarHeight = res.statusBarHeight + 44;
    keyHeight = e.detail.height - navBarHeight;
    if (keyHeight < 0) {
      keyHeight = 0;
    }
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: (keyHeight) + 'px'
    });
  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    });
  },
  /*
   * 退回上一页
   */
  toBackClick: function () {
    // No need to redirect back to the login page
    // wx.navigateBack({})
  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    var that = this; // 保存当前上下文的引用
  
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    });
  
    inputVal = '';
  
    this.sendRequest(e.detail.value , function(error, response) {
      if (error) {
        // 处理错误情况
        console.error('发生错误：', error);
      } else {
        // 处理成功情况
        console.log('请求成功，响应数据：', response["choices"]["0"]["message"]["content"]);
        var tmp_respond = response["choices"]["0"]["message"]["content"];
  
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          content: tmp_respond
        });
  
        that.setData({
          msgList: msgList,
          inputVal: inputVal
        });
      }
    });
  },

  sendRequest: function (e, callback) {
    let data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: e }]
    };
  
    wx.request({
      url: 'http://localhost:8000',
      method: 'POST',
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // 请求成功时调用回调函数，并传递响应数据
        callback(null, res.data);
      },
      fail: function (error) {
        // 请求失败时调用回调函数，并传递错误信息
        callback(error, null);
      }
    });
  }
  





});
