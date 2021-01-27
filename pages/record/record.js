// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0, // 已输入字数
    contact: '', // 联系方式
    content: '', // 反馈内容
  },

  // 监听输入内容
  listenInput: function (e) {
    let value = e.detail.value;
    let len = value.length;
    this.setData({
      'number': len
    })
  },

  // 用户反馈内容提交
  formSubmit: function(e){
    this.setData({
      'content': e.detail.value.content,
      'contact': e.detail.value.contact
    })
    wx.request({
      url: 'http://192.168.2.130:8888/service/submit',
      data:{content:this.data.content,contact:this.data.contact},
      header: {'content-type': 'application/json;charset=UTF-8;'},
      method: 'GET',
      success: res => {
          console.log(res.data === true)
          if(res.data === true){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
             })
          }else{
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 2000
             })
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