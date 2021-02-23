import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import yiyun from 'yiyun-components'

// 安装滚动条插件
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(HappyScroll)

if (process.env.VUE_APP_MODE == 'test') {
    yiyun.initEvn('test_*')
} else if (process.env.VUE_APP_MODE == 'production') {
    yiyun.initEvn('production_*')
} else if (process.env.VUE_APP_MODE == 'ptest') {
    yiyun.initEvn('ptest_*')
} else if (process.env.VUE_APP_MODE == 'staging') {
    yiyun.initEvn('staging_*')
}


var moment = require('moment')
Vue.filter('formatTime', function(value) {
    return moment.unix(Number(value / 1000)).format('YYYY-MM-DD-HH:mm')
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')