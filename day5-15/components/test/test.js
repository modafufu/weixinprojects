// components/test/test.js
Component({
options :{
//  styleIsolation:'isolated'//外部样式无法影响内部样式
styleIsolation: "isolated"//外部影响组件的内部，组件无法影响页面的外部

},
  /**
   * 组件的属性列表
   */
  properties: {
max:{
  //外部传进入，内部接收数据的值
  type:Number,
  value:10
}
  },

  /**
   * 组件的初始数据
   */
  data: {
count:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击事件处理函数
    addCount(){
      if(this.data.count>=this.properties.max) return
      this.setData({
        count:this.data.count+1,
        max:this.properties.max+1
      })
      this._showCount()
    },
    _showCount(){
      wx.showToast({
        title: 'count 是'+this.data.count,
        icon:'none'
      })
    },
    showInfo(){
      console.log(this.data)
      console.log(this.properties)
      console.log(this.data===this.properties)
    }
  }
})