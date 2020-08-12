// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    // 分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  bindsubmit: function(evt) {
    let money = evt.detail.value.money
    let event = evt.detail.value.event
    let name = evt.detail.value.name
    let remarks = evt.detail.value.remarks
    let all = evt.detail.value
    console.log("点击了提交", evt,all)

    // 引用数据库  
    const database = wx.cloud.database()
    const aggregate = database.collection("add")
    // 判断用户提交是否正确
    if (name !== "" & money !== "" & event !== "") {
      // 将用户填入数据移入数据库
      aggregate.add({
        data: {
          all: all,
          event: event,
          name: name,
          money: money,
          remarks: remarks,
        }
      })
      wx.showToast({
        title: '添加成功',
        image: '../../images/app/successTips.png/',
      })
    } else {
      wx.showToast({
        title: '添加失败',
        image: '../../images/app/destructionTips.png',
      })
    }

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

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})