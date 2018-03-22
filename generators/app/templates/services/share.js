import config from './share.config'

const initShare = function initShare(visible = true) {
  if (!visible) return

  if (!window.shareMode) {
    window.PAB.use(['share@2.0.1'], () => {
      window.shareMode.shareInit(config)
    })
  } else {
    window.shareMode.shareInit(config)
  }
}

export default initShare
