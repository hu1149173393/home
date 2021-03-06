const request = require('sync-request')
const res = request('GET', `https://dl-res.effio.cn/envList.json?_=${new Date().getTime()}`)
const jsonData = JSON.parse(res.getBody().toString())

process.env.VUE_APP_MAIN_HOST = jsonData[process.env.VUE_APP_MODE].api
// process.env.VUE_APP_MAIN_HOST = 'http://192.168.50.33:5001'
process.env.VUE_APP_SITE_HOST = jsonData[process.env.VUE_APP_MODE].webhomepage
process.env.VUE_APP_USER_HOST = jsonData[process.env.VUE_APP_MODE].account

module.exports = {
  publicPath: process.env.VUE_APP_MODE === 'production' ? jsonData.static_url + 'orgrelation' : '.',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false
}
