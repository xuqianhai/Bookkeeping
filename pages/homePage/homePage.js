// pages/homePage/homePage.js
Page({
  data: {
    notice:"",
    time:""
  },
  addButton:function(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  searchButton: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onLoad: function (options) {
    // 分享
    wx.showShareMenu({
      withShareTicket: true
    })
    // 数据库初始化
    const database = wx.cloud.database({})
    const aggregate = database.collection("overallSituation")
    database.collection('overallSituation').get({
      success: res => {
        console.log(res)
        // 取出数据库的值,overallSituation
        this.setData({
          notice: res.data[0].notice,
          time:res.data[0].time
        })
      }
    })
  },
});