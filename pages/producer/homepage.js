// pages/producer /homepage.js
const app = getApp()

Page({
  data:{
    id: null,
    name: null,
    logo: null,
    userInfo: {},
  },
  
  plant_harvest:function (){
    wx.navigateTo({
      url: '../producer/plant_harvest',
    })
  },



  onLoad: function () {
    this.setData({
      id: app.globalData.id,
      userInfo: app.globalData.userInfo
    });
    var that = this;
    wx.request({
      url: "http://geziwen.com:6002/api/producer/"+that.data.id,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // var name=[];
        // var logo=[];
        var info = res.data.data;
        // for(var i=0; i<info.length; i++) {
        //   name.push(info[i].name);
        //   logo.push(info[i].logo);
        // }
        that.setData({
          name:info.name,
          logo:info.logo,
        });
        console.log(that.data.name);
        console.log(that.data.logo);
      }
    })

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