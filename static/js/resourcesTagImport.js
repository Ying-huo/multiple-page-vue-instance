/*
 * 公用资源文件导入（js、css）
 * @Author: jun.fu
 * @Date: 2018-06-19 09:52:54
 * @Last Modified by: yingying.fan
 * @Last Modified time: 2019-07-25 15:35:22
 */
/* eslint-disable no-unused-vars */
var resume = true
var pause = false

// 用于区分调试还是生产的参数
window.prodInApp = false

var vuePath = './static/'
var appPath = '../'

var basePath = window.prodInApp ? appPath : vuePath

var scriptJs = [
  // 'api.js',
  // 'cordova.js',
  window.prodInApp ? 'js/vue/vue.min.js' : 'js/vue/vue.js',
  'js/vue/vue-router.min.js',
  'js/vue/vuex.min.js',
  'js/vue/axios.min.js',
  'js/flexible.js',
  'js/sign.min.js',
  'js/fastclick.min.js',
  'js/mtools.js'
]

var linkCss = ['css/public.css', 'css/flex.css', 'css/skin.css']

var jsArrayLen = scriptJs.length
for (var j = 0; j < jsArrayLen; j++) {
  document.write(
    "<script src='" +
      basePath +
      scriptJs[j] +
      "' type='text/javascript'></script>"
  )
}

document.write(
  "<script src='./static/js/projectconfig.js' type='text/javascript'></script>"
)

var cssArrayLen = linkCss.length
for (var i = 0; i < cssArrayLen; i++) {
  document.write(
    '<link rel="stylesheet" href="' +
      basePath +
      linkCss[i] +
      '" type="text/css"/>'
  )
}
