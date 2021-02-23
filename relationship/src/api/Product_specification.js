import http from '../unitls/http'

const resquest = '/operation'
// let postrequest = "http://192.168.50.15:31001/operation/ChannelHW/SetHWSwitch"

export function service_down (params) {
  // 华为云服务关
  return http.get(`${resquest}/ChannelHW/GetHWSwitch`, params)
}
export function Product_Specification_Form (params) {
  // 产品规格表格
  return http.get('http://192.168.50.15:31001/operation/ChannelHW/GetSkuList', params)
}
