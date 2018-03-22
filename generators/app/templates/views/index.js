import Vue from 'vue'
import APIPlugin from '@/plugins/APIPlugin'
import IndexView from './index.vue'

Vue.use(APIPlugin)

new Vue({
  render: h => h(IndexView),
}).$mount('#app')