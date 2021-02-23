export function Time_transformation (timestamp) {
  // 时间戳转换为时间
  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y, M, D, h, m, s
  Y = date.getFullYear() + '-'
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  D = date.getDate() + ' '
  h = date.getHours() + ':'
  m = date.getMinutes() + ':'
  s = date.getSeconds()
  return Y + M + D + h + m + s
}

export function Time_conversion_timestamp (time) {
  var date = new Date()
  date.setFullYear(time.substring(0, 4))
  date.setMonth(time.substring(5, 7) - 1)
  date.setDate(time.substring(8, 10))
  date.setHours(time.substring(11, 13))
  date.setMinutes(time.substring(14, 16))
  date.setSeconds(time.substring(17, 19))
  return Date.parse(date)
}
