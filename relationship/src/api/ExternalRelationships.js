import http from '../unitls/http'

const list = 'http://192.168.200.7:30008/OrgRelationCategory'

export function Typelist (params) {
  // 获取关系类型列表
  return http.get('http://192.168.200.7:30008/OrgRelationCategory/GetList', params)
}
