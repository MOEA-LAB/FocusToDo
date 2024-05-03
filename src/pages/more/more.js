// diary.js
Page({
  data: {
    currentDate: '',
    diaryContent: '',
    savedDiaries: []
  },
  onLoad: function () {
    this.getCurrentDate();
    this.loadDiaries();
  },
  getCurrentDate: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    this.setData({
      currentDate: formattedDate
    });
  },
  onInput: function (event) {
    this.setData({
      diaryContent: event.detail.value
    });
  },
  saveDiary: function () {
    const diary = this.data.currentDate + '\n' + this.data.diaryContent;
    const savedDiaries = [...this.data.savedDiaries, diary];
    wx.setStorageSync('diaries', savedDiaries);
    this.setData({
      savedDiaries: savedDiaries,
      diaryContent: '' // 清空输入框
    });
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  },
  loadDiaries: function () {
    const savedDiaries = wx.getStorageSync('diaries');
    if (savedDiaries) {
      this.setData({
        savedDiaries: savedDiaries
      });
    }
  },
  deleteDiary: function (event) {
    const index = event.currentTarget.dataset.index;
    const savedDiaries = this.data.savedDiaries;
    savedDiaries.splice(index, 1);
    wx.setStorageSync('diaries', savedDiaries);
    this.setData({
      savedDiaries: savedDiaries
    });
  },
  deleteAllDiaries: function () {
    wx.removeStorageSync('diaries');
    this.setData({
      savedDiaries: []
    });
  }
});
