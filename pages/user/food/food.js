// pages/user/food/food.js
const app = getApp();

Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    title:null,
    distributors: null,
    markers:null,
    polylines:null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   this.getDistributors();
   this.getTitle();
   this.getMarkers();
   this.getLocation();
   this.getPolylines();
  },

  getTitle: function(){
    var that = this;
    wx.request({
      url: 'http://geziwen.com:6002/api/distributors/',
    })
  },

  getLocation: function(){
    var that = this;
    app.getLocationInfo(function (locationInfo) {
        that.setData({
          longitude: locationInfo.longitude,
          latitude: locationInfo.latitude,
          markers: [
            {
              id: 0,
              iconPath: "../../../imgs/localred.png",
              longitude: locationInfo.longitude,
              latitude: locationInfo.latitude,
              width: 30,
              height: 30
            }
          ]
        })
    })
  },
 
  getMarkers:function(){
    var that = this;
    wx.request({
      url: 'http://geziwen.com:6002/api/product/1',
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var newMarkers=[];
        var dis = res.data.data.transactions;
        for (var i=0;i<dis.length;i++)
        {
          newMarkers.push({
            id: i+1,
            longitude: dis[i].receiver.longitude, 
            latitude: dis[i].receiver.latitude, 
            iconPath: '../../../imgs/local.png', 
            width: 30,
            height: 30});
        }
        that.setData({
          markers:newMarkers,
        });
        console
        console.log(that.data.markers)

      }
    })


  },

  getDistributors: function(){
    var that = this;
    wx.request({
      url: 'http://geziwen.com:6002/api/product/1',
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      }, 
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          distributors: res.data.data.transactions,
        });
        console.log(that.data.distributors)
       
      }
    })

  },

  getPolylines:function(){
    var that = this;
    wx.request({
      url: 'http://geziwen.com:6002/api/product/1',
      method:'GET',
      data:{},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data);
        var newPoly = [];
        var transactions = res.data.data.transactions;
        for(var i = 0 ; i < transactions.length; i++)
        {
          newPoly.push({
            points:[{
              longitude: transactions[i].sender.longitude,
              latitude: transactions[i].sender.latitude
            },{
              longitude: transactions[i].receiver.longitude,
              latitude: transactions[i].receiver.latitude
            }],
            color: "#ffffff",
            width: 1
          })
        }
        that.setData({
          polylines: newPoly,
        });
        console.log(that.data.polylines)

      }
    })

  },
    



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  console.log(this.data.markers);
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