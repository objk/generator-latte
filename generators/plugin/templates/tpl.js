const <%= pluginName %> = {
  install(Vue, options) {
    Vue.mixin({})
  }
}

// Automatic Installation
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(<%= pluginName %>)
}

export default <%= pluginName %>