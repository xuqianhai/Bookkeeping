//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindAuthor:function(){
    wx.showModal({
      title: '关于作者',
      content: '欢迎使用小程序,本小程序由大海独自完成,用于记账,份子钱等等.有任何问题可以联系作者,谢谢支持',
      showCancel: false,
      confirmText: '谢谢支持'
    })

  },
  bindDisclaimer: function () {
    wx.showModal({
      title: '关于作者',
      content: '本小程序所提供的信息，只供参考用,若内容有侵权请联系作者删除,本小程序是作者一手开发,请勿盗用,违反后带来的所有责任均与小程序作者无关。解释权归小程序作者所有,谢谢',
      showCancel: false,
      confirmText: '谢谢支持'
    })
  }
})
