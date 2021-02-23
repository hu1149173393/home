import Vue from 'vue'
import Vuex from 'vuex'
import copy from './Copy'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 从外部管理页面传递过来的左侧关系类型数据 存储
        leftMsg: [],
        // 从外部管理页面传递过来的右侧关系类型数据 存储
        rightTable: [],
        editorRelation: [],

        orgId: '',
        needMember: '',
        isActiveMember: '',
        needPost: '',
        close: '',
        dConfirm: '',
        initEnd: '',
        disabled: '',
        selected: '',
        deptId: '',
        state: '',
        showDelete: '',
        TypeID: '',
    },
    mutations: {

    },
    actions: {},
    modules: {
        copy
    }
})