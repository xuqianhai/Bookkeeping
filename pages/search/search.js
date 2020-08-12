// pages/homePage/homePage.js
Page({
  data: {
    lists: [{}],
    id:[],
    hidden: true,
  
    // list1:[]
  },
  // 获取用户输入内容
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },


  bindSearch: function() {
    var that = this; //这句不能少，在查询时
    wx.showLoading({
      title: '查询中...',
    })
    const database = wx.cloud.database()
    database.collection('add').where({
      name: that.data.name
    }).get({
      success: function(res) {
        console.log(res)
        let length = res.data.length
        var all = [];
        for (let i = 0; i < length; i++) {
          var id = res.data[i]._id
          var name = res.data[i].name
          var money = res.data[i].money
          var remarks = res.data[i].remarks
          var event = res.data[i].event
          var all = all.concat({id,name,money,remarks,event})
        }
        console.log(all)

        // for (let i = 0; i < length; i++) {
        //   var list = res.data[i].all
        //   var list1 = list1.concat(list)
          // console.log(list1)
        // }
        if (all != "") {
          let hidden = false
          that.setData({
            hidden: hidden
          })
          wx.hideLoading()
          wx.showToast({
            title: '查询成功',
            image: '../../images/app/successTips.png',
          })
          that.setData({
            lists: all,
          })
          // console.log(that.data.id)
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '查询失败',
            image: '../../images/app/destructionTips.png',
          })
        }
        // console.log(that.data.lists)
      }
    })
  },
  
  // 删除记录
  bindsubmit:function(evt) {
    wx.showLoading({
      title: '查询中...',
    })
    var that = this
    console.log(evt)
    var id = evt.detail.value.id
    console.log(id)
    const db = wx.cloud.database()
    // remove 删除操作
    // primary key 要删除的那条数据的主键id
    db.collection('add').doc(id)
      .remove()
      .then(res => {
        // 删除数据成功
        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
          image: '../../images/app/successTips.png',
        })
    
        console.log(res)
      }).catch(err => {
        // 删除数据失败
        wx.hideLoading()
        wx.showToast({
          title: '删除失败',
          image: '../../images/app/destructionTips.png',
        })
        console.log(err)
      })

  }
});