// pages/shoplist/shoplist.js
//动态的接口  https://applet-base-api-t.itheima.net/categories/1/shops
Page({

  /**
   * 页面的初始数据
   */
  data: {
query:{},
shopList:[],
page:1,
pageSize:10,
total:0,
isloading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.setData({
  query:options
})
this.getShopList()
  },
  getShopList(cb){
    this.setData({
      isloading:true
    })
    //展示loading效果
    wx.showLoading({
      title: '数据加载中',
    })
   wx.request({
     url: `https://applet-base-api-t.itheima.net/categories/${this.data.query.id}/shops`,
     method:'GET',
     data:{
       _page:this.data.page,
       _limit:this.data.pageSize
     },
     success:(res)=>{
      this.setData({
        shopList:[...this.data.shopList,...res.data],
        total:res.header['X-Total-Count'] - 0
      })
     },
     complete:()=>{
//隐藏loading效果
wx.hideLoading()
this.setData({isloading:false})   
//wx.stopPullDownRefresh()//关闭下拉刷新的窗口
cb&&cb()
     },
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
wx.setNavigationBarTitle({
  title: this.data.query.title,
})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
//需要重置关键的数据
this.setData({
  page:1,
  shopList:[],
  total:0
})
this.getShopList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
if(this.data.shopList===this.data.total)
//证明没有下一页数据
return  wx.showToast({
  title: '数据加载完毕',
  icon:'none'
})
    //是否正在加载其他数据
if(this.data.isloading) return
this.setData({
  page:this.data.page+1
})
this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})