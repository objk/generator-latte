import Vue from 'vue'
import APIPlugin from '@/plugins/APIPlugin'
import <%= viewName %>View from './<%= viewName %>.vue'

Vue.use(APIPlugin)

new Vue({
  render: h => h(<%= viewName %>View),
}).$mount('#app')