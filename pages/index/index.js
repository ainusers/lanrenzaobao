var app = getApp();
Page({
    data:{
        winHeight:"100%",//窗口高度
        currentTab:0, //预设当前项的值
        scrollLeft:0, //tab标题的滚动条位置
        initData: [], // 热点数据集
        triggered:true, // 控制是否自定义刷新
        isUpperPulled: false, // 判断是否为上拉操作
        status: [1,1,1,1,1,1,1,1,1], // 管理当前模块下的page
        menulist:[{"id":"1","title":"顶部"}, // 浮动球数据
                  {"id": "2","title": "分享"},
                  {"id": "3","title": "反馈"}],
        floatCircle:{"title": "菜单"},
        showmenus:true, // 控制浮动球列表是否显示
        topNum: 0, // 距离顶部距离
        count: '' // 数据多少分钟前更新
    },
    // 浮动按钮
    // 点击浮动按钮：菜单
    showclick:function(){
        let isshow = !this.data.showmenus;
        this.setData({showmenus: isshow})
    },
    // 点击具体的功能项
    itemclick:function(e){
        this.showclick();
        let info = e.currentTarget.dataset.item;
        // 回到顶部
        if(info.title === '顶部'){this.setData({topNum: this.data.topNum = 0})}
        // 小程序默认监听button，后期曲线救国
        if(info.title === '分享'){}
        if(info.title === '反馈'){wx.navigateTo({url: '/pages/record/record'})}
    },
    // 上拉加载
    getPageData(page) {
        wx.request({
            url: 'http://192.168.2.114:8888/service/page',
            header: {'content-type': 'application/json;charset=UTF-8;'},
            method: 'GET',
            data: {page: page,type: this.data.currentTab}, 
            complete: (res)=> {
                const data = res.data
                if(data.length>0){
                    // 取出当前页默认的* (10)条数据
                    for(let i=0,length=this.data.initData.length;i<length;i++){
                        if(i == this.data.currentTab){
                            this.data.initData[i] = this.data.initData[i].concat(res.data)
                        }
                    }
                    this.setData({
                        isUpperPulled: false,
                        initData: this.data.initData
                    })
                }else{
                    // 没有更多数据
                    this.setData({
                        isUpperPulled: false,
                    })
                }
            }
        })
    },
    scrollToLower: function(){
        // 获取当前模块的page
        let page = this.data.status[this.data.currentTab]
        if(!this.data.isUpperPulled){
            this.setData({
                isUpperPulled: true,
            })
            // 更新当前页page
            this.data.status[this.data.currentTab] = page + 1
            this.getPageData(this.data.status[this.data.currentTab])
        }
    },
    // 下拉刷新
    refresh(){
        wx.request({
            url: 'http://192.168.2.114:8888/service/refresh',
            data:{type:this.data.currentTab},
            header: {'content-type': 'application/json;charset=UTF-8;'},
            method: 'GET',
            success: res => {
                for(let i=0,length=this.data.initData.length;i<length;i++){
                    if(i == this.data.currentTab){
                        this.data.initData[i] = res.data
                        this.data.status[this.data.currentTab] = 1
                    }
                }
                this.setData({
                    initData:this.data.initData,
                    triggered:false,
                })
            }
        })
    },
    // 滚动切换标签样式
    switchTab:function(e){
        var that = this;
        that.setData({
            currentTab:e.detail.current
        });
        that.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav:function(e){
　　　　var that = this;　
        var cur=e.target.dataset.current;
        if(that.data.currentTab==cur){return false;}
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
                var calc=clientHeight*rpxR-180;
                    that.setData( {  
                        winHeight: calc  
                    });  
            }  
        });
        // 初始化热点数据
        wx.request({
            url: 'http://192.168.2.114:8888/service/init',
            header: {'content-type': 'application/json;charset=UTF-8;'},
            method: 'GET',
            success: res => {
                console.log(res.data)
                this.setData({
                    initData: res.data
                })
            }
        })
        // 开启轮询后台接口
        wx.request({
            url: 'http://192.168.2.114:8888/service/time',
            header: {'content-type': 'application/json;charset=UTF-8;'},
            method: 'GET',
            success: res => {
                this.setData({
                    count: res.data
                })
            }
        })
    },
    footerTap:app.footerTap
})