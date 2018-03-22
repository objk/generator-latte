/*
* @Author: WUZHILONG860
* @Date:   2017-12-25 12:22:07
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2017-12-29 14:03:01
*/
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
const spinner = {
  start() {
    const html = `
      <div id="preloading" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0); z-index: 999999;">
        <div style="position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); width: 100px; height: 100px; background: rgba(0, 0, 0, .65); border-radius: 3px;">
          <img style="display: block; width: 42px; height: 42px; margin: auto; margin-top: 15px;" src="https://b.pingan.com.cn/bbc/static/images/spinner.gif" alt="pingan.com.cn" />
          <div class="loading_text" style="letter-spacing: .5px; text-align: center; margin: 9px auto auto auto; font-size: 15px; color: #ffffff; font-family: Arial, Microsoft YaHei;">加载中...</div>
        </div>
      </div>
    `
    const div = document.createElement('div')
    const body = document.body

    div.id = 'js-spinner'
    div.innerHTML = html

    body.insertBefore(div, body.firstChild)
  },

  close() {
    const currentSpinner = document.getElementById('js-spinner')

    // 如果有 currentSpinner 则移除 currentSpinner
    // if (currentSpinner) document.body.removeChild(currentSpinner)

    try {
      document.body.removeChild(currentSpinner)
    } catch (e) {}
  }
}

export default spinner
