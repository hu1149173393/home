import Axios from 'axios'
import { Message, Loading } from 'element-ui'
// 加密插件
import md5 from 'js-md5'

let Url = ''
let mainUrl = `${Url}/Core`
let ManagerUrl = `${Url}/Core/Map`
let DeviceUrl = `${Url}/devicemodel/devicemodel`
let MapUrl = `${Url}/Map/Map`
let MapBlockUrl = `${Url}/Map/MapBlock`
let MapMarkUrl = `${Url}/Map/MapMark`
let ModelIconUrl = `${Url}/Map/ModelIcon`
let CoreUrl = `${Url}/Core`
let smallCoreUrl = `${Url}/core`

function initUrl () {
  const environment = window.sessionStorage.getItem(md5('__environment__'))
  if (environment === md5('test_*')) {
    Url = 'http://192.168.200.7:30008'
  } else if (environment === md5('ptest_*')) {
    Url = 'https://console.ptest.effio.cn/31008'
  } else if (environment === md5('staging_*')) {
    Url = 'https://staging-api.effio.cn'
  } else {
    Url = 'https://api.effio.cn'
  }

  mainUrl = `${Url}/Core`
  ManagerUrl = `${Url}/Core/Map`
  DeviceUrl = `${Url}/devicemodel/devicemodel`
  MapUrl = `${Url}/Map/Map`
  MapBlockUrl = `${Url}/Map/MapBlock`
  MapMarkUrl = `${Url}/Map/MapMark`
  ModelIconUrl = `${Url}/Map/ModelIcon`
  CoreUrl = `${Url}/Core`
  smallCoreUrl = `${Url}/core`
}

const axios = Axios.create()

let LoadingInstance
let loadings = 0
let timer

export const showLoading = () => {
  if (loadings === 0) {
    LoadingInstance = Loading.service({ fullscreen: true, background: 'transparent' })
    timer = setTimeout(() => {
      if (LoadingInstance) {
        LoadingInstance.close()
        LoadingInstance = undefined
      }
      clearTimeout(timer)
      timer = undefined
    }, 15000)
  }
  loadings++
}

export const hideLoading = () => {
  loadings--
  if (loadings <= 0) {
    LoadingInstance && LoadingInstance.close()
    LoadingInstance = undefined
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }
}

axios.interceptors.response.use(function (res) {
  hideLoading()
  if ((res.status >= 200 && res.status <= 204) || res.status === 304) {
    if (res.data.code && res.data.code !== 1000 && res.data.code !== 1009) {
      Message({
        type: 'error',
        message: res.data.msg
      })
    }
    return res.data
  }
  return Promise.reject(res)
}, function (error) {
  hideLoading()
  if (error.response.status === 401) {
    Message({
      type: 'error',
      message: '登陆超时,请重新登录！'
    })
    return Promise.reject('登陆超时,请重新登录！')
  } else if (error.response.status === 403) {
    Message({
      type: 'error',
      message: '没有权限！'
    })
    return Promise.reject('没有权限！')
  } else {
    Message({
      type: 'error',
      message: '网络错误！'
    })
    return Promise.reject('网络错误！')
  }
})

async function get (url, params = {}) {
  showLoading()
  return await axios.get(url, {
    params,
    headers: {
      Authorization: window.sessionStorage.getItem('encryption')
    }
  })
}

async function post (url, data, headers = { 'Content-Type': 'application/json' }, submitAuthorization = false) {
  showLoading()
  if (window.sessionStorage.getItem('encryption') && !submitAuthorization) {
    headers.Authorization = window.sessionStorage.getItem('encryption')
  }
  if (!submitAuthorization) {
    data = JSON.stringify(data)
  }
  return await axios.post(url, data, {
    headers
  })
}

export function getModalList () {
  initUrl()
  return get(mainUrl + '/Equipment/GetModelList')
}

export function getExampleList () {
  initUrl()
  return get(mainUrl + '/Equipment/GetExampleList')
}

export function getAreaList () {
  initUrl()
  return get(mainUrl + '/Area/GetList')
}

export function getStationList () {
  initUrl()
  return get(mainUrl + '/Station/GetList')
}

export function getOrgMapList () {
  initUrl()
  return get(`${ManagerUrl}/GetOrgMapList`)
}

export function getMapInfoById (id) {
  initUrl()
  return get(`${ManagerUrl}/GetMapInfoById`, { id })
}

export function getComponentList (id = '') {
  initUrl()
  return get(`${ManagerUrl}/GetComponentList`, { componentTypeId: id })
}

export function getNodeTree ({ orgId = '' }) {
  initUrl()
  if (orgId) {
    return get(`${DeviceUrl}/GetNodeTree?orgId=${orgId}`)
  }
  return get(`${DeviceUrl}/GetNodeTree`)
}

export function GetMapList ({ caseId, orgId = '' }) {
  initUrl()
  return get(`${MapUrl}/GetMapList?caseId=${caseId}&orgId=${orgId}`)
}
export function GetBlockList ({ mapId }) {
  initUrl()
  return get(`${MapBlockUrl}/GetBlockList?mapId=${mapId}`)
}

export function GetMarkList ({ mapId }) {
  initUrl()
  return get(`${MapMarkUrl}/GetMarkList?mapId=${mapId}`)
}

export function GetIconList () {
  initUrl()
  return get(`${ModelIconUrl}/GetIconList`)
}

export function GetMapInfo ({ id, orgId = '' }) {
  initUrl()
  return get(`${MapUrl}/GetMapInfo?id=${id}&orgId=${orgId}`)
}

export function GetNodeList ({ id, level }) {
  initUrl()
  return get(`${DeviceUrl}/GetNodeList?level=${level}&id=${id}`)
}

export function GetDeptTree ({ orgId, needMember, isActiveMember, needPost }) {
  initUrl()
  return get(`${CoreUrl}/Dept/GetDeptTree?orgId=${orgId}&needMember=${needMember}&isActiveMember=${isActiveMember}&needPost=${needPost}`)
}

export function GetPosList (orgId) {
  initUrl()
  return get(`${CoreUrl}/Position/GetPosList?orgId=${orgId}`)
}

export function GetMembersByDept ({ orgId, deptId }) {
  initUrl()
  return get(`${CoreUrl}/Member/GetMembersByDept?orgId=${orgId}&deptId=${deptId}`)
}

export function OrgAppSettingsDetail ({ appId }) {
  initUrl()
  return post(`${smallCoreUrl}/OrgAppSettings/Detail`, { appId })
}

export function company () {
  initUrl()
  return get(mainUrl + '/Organization/GetMyOrganizations')
}
