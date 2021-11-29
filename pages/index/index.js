// index.js
// 获取应用实例
const app = getApp()

Page( {
  data: {
    data: 'USD',
    list: [],
    array: ["选择",'小营校区', '健翔桥校区', '清河校区', '沙河校区'],
    objectArray: [
      {
        id: 1,
        name: '小营校区'
      },
      {
        id: 2,
        name: '健翔桥校区'
      },
      {
        id: 3,
        name: '清河校区'
      },
      {
        id: 4,
        name: '沙河校区'
      }
    ],
    index: 1,  
    radio:0,
    month:0,
    day:1,
    year:0
  },
  bandleChange(e){
    // 1 获取单选框中的值
    let gender = e.detail.value;
    // 2 把值赋值给 data 中的数据
    if (gender == "today") {
      this.load(this.data.day,this.data.month)
    } else if  (gender == "tomorrow") {
      var m = this.data.month
      var day = this.data.day
      if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 11) {
        if (day+1> 31) {
          m+=1
          day= day-30
        } else  {
          day+=1
        }
      } else if (m ==2 ) {
        var y = this.data.year
        if((y%4==0 && y%100!=0)||y%400==0){
          if (day+1> 29) {
            m+=1
            day= day-28
          } else  {
            day+=1
          }
        }else{
          if (day+1> 28) {
            m+=1
            day= day-27
          } else  {
            day+=1
          }
        }
       
      } else{
        if (day+1> 30) {
          m+=1
          day= day-29
        } else  {
          day+=1
        }
      }
      this.load(day,m)
      this.setData(
        {
          month: m,
          day:day,
        }
      )
    }else{
      var m = this.data.month
      var day = this.data.day
      if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 11) {
        if (day+2> 31) {
          m+=1
          day= day-29
        } else  {
          day+=2
        }
      } else if (m == 2 ) {
        var y = this.data.year
        if((y%4==0 && y%100!=0)||y%400==0){
          if (day+2> 29) {
            m+=1
            day= day-27
          } else  {
            day+=2
          }
        }else{
          if (day+2> 28) {
            m+=1
            day= day-26
          } else  {
            day+=2
          }
        }
       
      } else{
        if (day+2> 30) {
          m+=1
          day= day-28
        } else  {
          day+=2
        }
      }
      this.load(day,m)
      this.setData(
        {
          month: m,
          day:day,
        }
      )
    }
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.load(this.data.day,this.data.month)
  },
  load : function(d,m){
    var that = this;
    wx.request( {
      url: "https://www.thinkstu.com/"+that.data.index+"/"+that.data.index+m+d+".json",
      success: function( res ) {
        console.info(res.data[1].a)
        that.setData( {
          data:res.data,
          list: res.data
        })
      }
    })
  },
  onLoad: function( options ) {

var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年份  
var Y =date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
this.setData(
  {
    month: M,
    day:D,
    year:Y
  }
)
this.load(D,M)
  }
})

