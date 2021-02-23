import Axios from 'axios'
import { Message, Loading } from 'element-ui'
import md5 from 'js-md5'
import yiyun from 'yiyun-components'

// let url = `http://192.168.50.98:5001`

// const DeviceUrl = `${url}/orgrelation/OrgRelationCategory/`
// const StandbyUrl = `${url}/orgrelation/OrgRelationApply/`

const DeviceUrl = `${process.env.VUE_APP_MAIN_HOST}/orgrelation/OrgRelationCategory/`
const StandbyUrl = `${process.env.VUE_APP_MAIN_HOST}/orgrelation/OrgRelationApply/`
const agionUrl = `${process.env.VUE_APP_MAIN_HOST}/OrgRelation/OrgRelation/`
const User = `${process.env.VUE_APP_USER_HOST}/account/User/`

// orgrelation

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
        LoadingInstance.close()
        LoadingInstance = undefined
        if (timer) {
            clearTimeout(timer)
            timer = undefined
        }
    }
}

const axios = Axios.create()

axios.interceptors.response.use(function(res) {
    hideLoading()
    if ((res.status >= 200 && res.status <= 204) || res.status === 304) {
        return res.data
    }
    return Promise.reject(res)
}, function(error) {
    hideLoading()
    if (error && error.response && error.response.status) {
        switch (error.response.status) {
            case 401:
                Message({
                    type: 'error',
                    message: '登陆超时,请重新登录！'
                })
                break
            case 403:
                Message({
                    type: 'error',
                    message: '没有权限！'
                })
                break
            default:
                Message({
                    type: 'error',
                    message: '网络错误！'
                })
                break
        }
    }
    return Promise.reject(error)
})

async function post(url, data, headers = { 'Content-Type': 'application/json' }, submitAuthorization = false) {
    showLoading()
    if (window.sessionStorage.getItem('Authorization') && !submitAuthorization) {
        headers.Authorization = window.sessionStorage.getItem('Authorization')
    }
    if (!submitAuthorization) {
        data = JSON.stringify(data)
    }
    return await axios.post(url, data, {
        headers
    })
}

async function get(url, data = {}) {
    showLoading()
    return await axios.get(url, {
        params: data,
        headers: {
            Authorization: window.sessionStorage.getItem('Authorization')
        }
    })
}

async function suibian(url, data, headers = { 'Content-Type': 'application/json' }, submitAuthorization = false) {
    showLoading()
    if (window.sessionStorage.getItem('Authorization') && !submitAuthorization) {
        headers.Authorization = window.sessionStorage.getItem('Authorization')
    }
    if (!submitAuthorization) {
        data = JSON.stringify(data)
    }
    return await axios.delete(url, data = {
        headers,
        data: data
    })
}

export default {
    state: {},
    getters: {

    },
    mutations: {

    },
    actions: {
        getme() {
            return get(`${User}GetMe`)
        },
        // 创建类型
        CreateType({ commit }, { name }) {
            return post(`${DeviceUrl}Create`, { name })
        },
        // 重命名关系类型
        rename({ commit }, { id, name }) {
            return post(`${DeviceUrl}Rename`, { id, name })
        },
        // 删除关系类型， 已有绑定关系的类型不能删除
        delet({ commit }, { id }) {
            return suibian(`${DeviceUrl}Delete`, { id })
        },
        // 查询企业列表
        QueryEnterprise({ commit }, { page, limit, keywords }) {
            // return get(`http://192.168.50.98:5001/orgrelation/OrgRelationApply/GetOrgList?page=1&limit=5`, { keywords })
            return get(`${StandbyUrl}GetOrgList`, { page, limit, keywords })
        },
        // 获取关系类型列表
        Typelist() {
            // return get(`http://192.168.50.98:5001/devicemodel/OrgRelationCategory/GetList`)
            return get(`${DeviceUrl}GetList`)
        },
        // 获取发出的邀请列表
        invitationList({ commit }, { type, page, limit, keywords, status }) {
            return get(`${StandbyUrl}GetSentApplyList`, { type, page, limit, keywords, status })
        },
        // 获取收到的邀请列表
        ReceivedInvitation({ commit }, { page, limit, keywords }) {
            return get(`${StandbyUrl}GetReceivedApplyList`, { page, limit, keywords })
        },
        // 发起申请
        ByApplyingFor({ commit }, { members, reason, categoryId, toOrgId }) {
            return post(`${StandbyUrl}CreateApply`, { members, reason, categoryId, toOrgId })
        },
        // 查看申请
        applyFor({ commit }, { id }) {
            return get(`${StandbyUrl}GetDetail`, { id })
        },

        // 处理申请
        ProcessingApplication({ commit }, { id, isPass, reason, members }) {
            return post(`${StandbyUrl}ProcessApply`, { id, isPass, reason, members })
        },

        // 获取企业关系列表
        ListOf({ commit }, { relationStatus, page, limit, keywords, categoryId }) {
            return get(`${agionUrl}GetList`, { relationStatus, page, limit, keywords, categoryId })
        },
        // 解绑
        untie({ commit }, { id }) {
            return post(`${agionUrl}Unbind`, { id })
        },
        // 重新绑定
        rebinding({ commit }, { id }) {
            return post(`${agionUrl}Rebind`, { id })
        },
        // 获取企业关系详情
        RelationshipDetails({ commit }, { id }) {
            return get(`${agionUrl}GetDetail`, { id })
        },
        // 添加联系人
        addContact({ commit }, { id, memberId }) {
            return post(`${agionUrl}AddMember`, { id, memberId })
        },

        // 转交主负责人
        transferHead({ commit }, { id, memberId }) {
            return post(`${agionUrl}ChangeLeader`, { id, memberId })
        },

        // 移除联系人
        DeleteMember({ commit }, { id, memberId }) {
            return post(`${agionUrl}RemoveMember`, { id, memberId })
        },
        // 编辑联系人
        EditMan({ commit }, { id, memberId, job }) {
            return post(`${agionUrl}EditMember`, { id, memberId, job })
        },
        // 设置分类
        SetCate({ commit }, { id, relationCategoryId }) {
            return post(`${agionUrl}SetCategory`, { id, relationCategoryId })
        }

    }
}