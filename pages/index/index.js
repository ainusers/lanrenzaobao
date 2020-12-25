var app = getApp();
Page({
    data:{
        winHeight:"",//窗口高度
        currentTab:0, //预设当前项的值
        scrollLeft:0, //tab标题的滚动条位置
        initData: []
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
    footerTap:app.footerTap
})