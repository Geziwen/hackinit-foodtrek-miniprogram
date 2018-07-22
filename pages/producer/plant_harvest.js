// pages/producer/plant_harvest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food_types: [],
    objectArray: [],
    index: 0,
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  goback: function(){
    wx.navigateTo({
      url: '../producer/homepage',
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://geziwen.com:6002/api/product/create',
      data: {
        type_id : this.data.index+1,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.request({
      url: 'http://geziwen.com:6002/api/foods',
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data.data);
        var food_types = [];
        for(var i=0; i<res.data.data.length; i++) {
          food_types.push(
            [res.data.data[i].name,
            res.data.data[i].id]
          );
        }
        _this.setData({
          objectArray: res.data.data,
          food_types: food_types,
        });
        console.log(_this.data.food_types);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})