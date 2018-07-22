// pages/producer /homepage.js
const app = getApp()

Page({
  data:{
    userInfo: {},
  },
  
  plant_harvest:function (){
    wx.navigateTo({
      url: '../producer/plant_harvest',
    })
  },

  onLoad: function () {

    this.setData({
        userInfo: app.globalData.userInfo,
    });

    var that = this;
    // 获取定位，并把位置标示出来
    app.getLocationInfo(function (locationInfo) {
      console.log('map', locationInfo);
      that.setData({
        longitude: locationInfo.longitude,
        latitude: locationInfo.latitude,
        markers: [
          {
            id: 0,
            iconPath: "../../imgs/local.png",
            longitude: locationInfo.longitude,
            latitude: locationInfo.latitude,
            width: 30,
            height: 30
          }
        ]
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        var mtabW = res.windowWidth / 4; //设置tab的宽度
        that.setData({
          tabW: mtabW
        })
      }
    });

      
  }  
})