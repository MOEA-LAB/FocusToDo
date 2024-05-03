// changePage.js

Page({
  globalData: {
    userInfo: null, // 初始值为空，当用户登录后设置为用户信息对象
    avatarUrl: '', // 用户当前头像地址
    nickName: '', // 用户新用户名字
  },

  onLoad: function(options) {
    // 获取用户当前头像地址
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      newUserName: getApp().globalData.userInfo.nickName, // 默认新用户名字为当前用户名字
    });
  },

  chooseImage: function() {
    // 选择新头像
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          avatarUrl: tempFilePaths[0] // 更新头像地址
        });
      }
    });
  },

  inputUserName: function(e) {
    // 输入新用户名字
    this.setData({
      newUserName: e.detail.value
    });
  },

  confirmChange: function() {
    // 确认修改
    getApp().globalData.userInfo.avatarUrl = this.data.avatarUrl; // 更新全局用户信息中的头像地址
    getApp().globalData.userInfo.nickName = this.data.newUserName; // 更新全局用户信息中的用户名字

    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },

  // 在页面A中的某个方法中调用 wx.navigateBack() 返回页面B，并传递回调函数
goBack: function() {
  wx.navigateBack({
    delta: 1,
    success: function() {
      // 返回成功后执行的回调函数
      console.log("返回成功");
      // 如 callbackFunction();
    }
  });
}

});
