import configs from './auth.config'

const initAuth = function initAuth() {
  const settings = {
    agents: ['$.ajax'],
    channel: 'C0013',
    partnerId: '',
    configs,
  }

  return new Promise((resolve) => {
    if (!window.AuthCore) {
      window.PAB.use(['auth'], () => {
        window.AuthCore.init(settings)
        resolve()
      })
    } else {
      window.AuthCore.init(settings)
      resolve()
    }
  })
}

export default initAuth
