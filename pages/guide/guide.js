//guide.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '懒人早读',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 引导页自动跳转
  onShow: function(){
    setTimeout(function(){
      wx.navigateTo({
        url: '../auth/auth',
      })
    },1500)
  }
})