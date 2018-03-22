/*
* @Author: WUZHILONG860
* @Date:   2017-12-25 12:29:14
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2018-03-16 12:30:35
*/
/* eslint no-param-reassign: "off" */
import API from '@/api'

const APIPlugin = {
  install(Vue) {
    Vue.prototype.$APIs = API

    Vue.mixin({
      methods: {
        go(url, aladdinConfig = {}, type = '') {
          // 没有引入 aladdin 并且不在 口袋APP 环境，使用浏览器跳转
          if (!(window.aladdin && !!window.navigator.userAgent.toLowerCase().match('paebank'))) {
            if (type === 'replace') {
              window.location.replace = url

              return
            }

            window.location.href = url

            return
          }

          // more info
          // http://fenghuang.pab.com.cn/components/base/aladdin/navigator/h5.html
          window.aladdin.navigator.forward(aladdinConfig)
        }
      } // end methods
    }) // end Vue.mixin
  } // end install
}

// Automatic Installation
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(APIPlugin)
}

export default APIPlugin
