// pages/login/login.js
const app = getApp();

Page({

  /**
  * 页面的初始数据
  */
  data: {
  },

  test: function () {
    wx.request({
      url: 'http://geziwen.com:6002/api/test',
      data: {
        "api_token": this.data.api_token,
      },
      success: function (res) {
        console.log(res);
      }
    })
  },

  formSubmit: function (e) {
    let _this = this;
    if (e.detail.value.email.length == 0 || e.detail.value.password.length == 0) {
      wx.showModal({
        title: '登录失败',
        content: '邮箱或密码不能为空！',
      })
    }
    else {
      wx.request({
        url: "http://geziwen.com:6002/api/login", //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          email: e.detail.value.email,
          password: e.detail.value.password,
        },
        success: function (res) {
          console.log(res);
          var api = res.data.api_token;
          // console.log(_this.data.api_token);
          if (api != null) {
            app.globalData.api_token = api;
            app.globalData.id = res.data.link;
            app.globalData.user_id = res.data.id;
            app.globalData.user_role = res.data.role_id;
            console.log(app.globalData.id);
          }
          else {
            wx.showModal({
              title: '登录失败',
              content: '邮箱或密码错误！',
            })
          }

          if (app.globalData.api_token != null) {
            if (app.globalData.user_role == 2) {
              wx.navigateTo({
                url: '../distributor/distributor',
              })
            }
            else if (app.globalData.user_role == 1) {
              wx.navigateTo({
                url: '../producer/homepage',
              })
            }
          }
        }
      })
    }
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
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