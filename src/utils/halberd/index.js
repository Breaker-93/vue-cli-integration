export default {
  // 判断字符串是否为json格式的字符串，返回 Boolean
  isJsonString(str) {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  },
  // 将有可能是json字符串的变量转化，如果不是json字符串原值返回
  parseJsonString(str) {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return JSON.parse(str)
      } else {
        return str
      }
    } catch (e) {
      return str
    }
  },
  // 生成13位全局唯一id
  guid() {
    // 'xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx' 36位
    // 'xxxxxxxx-3xxx' 13位
    return 'xxxxxxxx-3xxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },
  // 获取指定天数以前或以后的日期 day: 天数（负数为以前，正数为以后）
  getBeforeDate(day) {
    let today = new Date()
    let targetDayMilliSeconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetDayMilliSeconds)
    let tYear = today.getFullYear()
    let tMonth = today.getMonth()
    let tDate = today.getDate()
    tMonth = this.fillNumberZero(tMonth + 1)
    tDate = this.fillNumberZero(tDate)
    return tYear + '/' + tMonth + '/' + tDate
  },
  fillNumberZero(num) {
    let m = num
    if (num.toString().length == 1) {
      m = '0' + num
    }
    return m
  },
}
