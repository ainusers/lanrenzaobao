// pages/record/record.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'世界上最好的心理医生，是时间。'
  },
  // 获取用户信息
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo);
      let nickName = e.detail.userInfo.nickName
      let country = e.detail.userInfo.country
      let province = e.detail.userInfo.province
      let city = e.detail.userInfo.city === '' ? '无城市' : e.detail.userInfo.city
      let gender = e.detail.userInfo.gender === 1 ? "男" : "女"
      let avatarUrl = e.detail.userInfo.avatarUrl
      let user = '<' + nickName + '> - {' + country + ' - ' + province + ' - ' + city + '} - <' + gender + '> - {' + avatarUrl +'}';
      // 效率优先：先跳转
      wx.navigateTo({
        url: '../index/index',
      })
      // 用户统计功能
      wx.request({
        url: 'https://www.lanrenzaodu.top:8888/service/statistics',
        data: {message:user},
        header: {'content-type': 'application/json;charset=UTF-8;'},
        method: 'GET',
        success: res => {
          // 成功统计用户信息
        }
    })
    } else {
      this.showModal()
    }
  },
  // 引导用户授权模态框
  showModal: function() {
    let _this = this
    wx.showModal({
      title: '小程序申请获得以下权限',
      content: '获得你的公开信息（昵称、头像、地区及性别）',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '点击GO，让我们愉快的阅读吧！',
            icon: 'none',
            duration: 2000
           })
        } else if (res.cancel) {
          _this.showModal()
        }
      }
    })
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