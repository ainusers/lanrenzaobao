var app = getApp();
Page({
    data:{
        winHeight:"",//窗口高度
        currentTab:0, //预设当前项的值
        scrollLeft:0, //tab标题的滚动条位置
        initData: [],
        freshStatus: 'more', // 当前刷新的状态
        showRefresh: false   // 是否显示下拉刷新组件
    },
    // 滚动切换标签样式
    switchTab:function(e){
        var that = this;
        that.setData({
            currentTab:e.detail.current
        });
        that.checkCor();
    },
    // 点击或长按复制文本连接
    // copyLink:function(){
    //     var that = this;
    //     var currentIndex = e.currentTarget.dataset.idx;
    //     console.log(currentIndex); 
    //     console.log(that.initData[currentIndex].link)
    //     wx.setClipboardData({
    //         data: that.initData[currentIndex].link,
    //         success: function (res) {
    //             wx.showToast({
    //                 title: '复制成功',
    //             });
    //         }
    //     });
    // },
    // 点击标题切换当前页时改变样式
    swichNav:function(e){
　　　　　var that = this;　
        var cur=e.target.dataset.current;
        if(that.data.currentTaB==cur){return false;}
        else{
            that.setData({
                currentTab:cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor:function(){
　　　 var that = this;
      if (that.data.currentTab>4){
        that.setData({
          scrollLeft:300
        })
      }else{
        that.setData({
          scrollLeft:0
        })
      }
    },
    onLoad: function() {  
        var that = this; 
        //  高度自适应
        wx.getSystemInfo( {  
            success: function( res ) {  
                var clientHeight=res.windowHeight,
                    clientWidth=res.windowWidth,
                    rpxR=750/clientWidth;
              var  calc=clientHeight*rpxR-180;
                console.log(calc)
                that.setData( {  
                    winHeight: calc  
                });  
            }  
        });
        // 初始化热点数据
        wx.request({
            url: 'http://192.168.2.114:8888/service/init',
            header: {'content-type': 'application/json'},
            success: res => {
                console.log(res.data)
                this.setData({
                    initData: res.data
                })
            }
        })
    },  
    // 触摸开始
    touchStart(e) {
        this.setData({
          startY: e.changedTouches[0].pageY,
          freshStatus: 'more'
        })
      },
      // 触摸移动
      touchMove(e) {
        let endY = e.changedTouches[0].pageY;
        let startY = this.data.startY;
        let dis = endY - startY;
        // 判断是否下拉
        if (dis <= 0) {
          return;
        }
        let offsetTop = e.currentTarget.offsetTop;
        if (dis > 20) {
          this.setData({
            showRefresh: true
          }, () => {
            if (dis > 50) {
              this.setData({
                freshStatus: 'end'
              })
            } else {
              this.setData({
                freshStatus: 'more'
              })
            }
          })
        } else {
          this.setData({
            showRefresh: false
          })
        }
      },
      // 触摸结束
      touchEnd(e) {
        if (this.data.freshStatus == 'end') {
          // 延迟 500 毫秒，显示 “刷新中”，防止请求速度过快不显示
          setTimeout(()=>{
              this.getList(); // 获取最新列表数据
          }, 500);
        } else {
          this.setData({
            showRefresh: false
          })
        }
      },
    footerTap:app.footerTap
})