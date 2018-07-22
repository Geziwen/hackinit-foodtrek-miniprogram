// pages/distributor/distributor.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    logo: null,
    transactions: [],
    status:[],
    id: 0,
    location: {},
    requests: [],
    sends: [],
    toBeReceived: [],
    received: [],
    tabs: ["待确认", "待接收", "已送达", "已接收"],
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0
  },

  tabClick: function (e) {
    var that = this;
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
  },
  bindChange: function (e) {
    var current = e.detail.current;
    if ((current + 1) % 4 == 0) {

    }
    var offsetW = current * this.tabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });

  },

  confirm: function (e) {
    var confirm_id = e.currentTarget.dataset.id;
    var trans_id = e.currentTarget.dataset.trans;
    var temp = this.data.requests;
    temp.splice(confirm_id, 1);
    this.setData({
      requests: temp
    });
    wx.request({
      url: 'http://geziwen.com:6002/api/transaction/'+trans_id+'/confirm',
    })
    console.log(this.data.requests);
  },

  send: function () {
    wx.navigateTo({
      url: '../send/send',
    })
  },

  receive: function (e) {
    var receive_id = e.currentTarget.dataset.id;
    var trans_id = e.currentTarget.dataset.trans;
    var temp = this.data.toBeReceived;
    temp.splice(receive_id, 1);
    this.setData({
      toBeReceived: temp
    });
    wx.request({
      url: 'http://geziwen.com:6002/api/transaction/' + trans_id + '/receive',
    })
    console.log(this.data.toBeReceived);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: app.globalData.id
    });
    var that = this;
    wx.request({
      url: "http://geziwen.com:6002/api/distributor/"+that.data.id,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var sends = [];
        var requests = [];
        var received = [];
        var toBeReceived = [];
        var status = [];
        var transactions = res.data.data.transactions;
        for(var i = 0; i < transactions.length; i++) {
          if (transactions[i].confirmed_at == null) {
            status.push({
              message: "未接受",
              status_type: "warn",
            });
          }
          else if (transactions[i].received_at == null) {
            toBeReceived.push({
              receiver_name: transactions[i].receiver.name,
              receiver_contact: transactions[i].receiver.email,
              product: transactions[i].product.type.name,
              trans_id: transactions[i].id
            });
            status.push({
              message: "运送中",
              status_type: "default",
            });
          }
          else {
            status.push({
              message: "已送达",
              status_type: "primary",
            });
          }

          if(transactions[i].sender_id == that.data.id){
            sends.push({
              trans_id: transactions[i].id,
              time: transactions[i].confirmed_at,
              product: transactions[i].product.type.name,
            });
          }

          else if (transactions[i].receiver_id == that.data.id) {
            requests.push({
              trans_id: transactions[i].id,
              sender_name: transactions[i].sender.name,
              product: transactions[i].product.type.name
            });
          }

          received.push({
            trans_id: transactions[i].id,
            receiver_name: transactions[i].receiver.name,
            received_time: transactions[i].received_at
          });
        }
        that.setData({
          sends: sends,
          requests: requests,
          received: received,
          toBeReceived: toBeReceived,
          status: status,
          name : res.data.data.name,
          logo : res.data.data.logo,
          transactions : transactions,
        });
        console.log(that.data.name);
        console.log(that.data.logo);
        console.log(that.data.transactions);
        console.log(that.data.requests);
      }
    })

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