/*
* @Author: WUZHILONG860
* @Date:   2017-12-25 12:21:52
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2017-12-27 18:27:17
*/
import $ from 'zepto'
import spinner from './spinner'
import utils from './index'

const fetch = function fetch(url = '', options = {}) {
  return new Promise((resolve, reject) => {
    const request = options || {}

    // is current spinning
    const spinning = !!document.getElementById('js-spinner')

    // is show spinning when make ajax request
    request.loading = (options.loading === false) !== true

    request.url = url

    const ajaxSettings = {
      type: 'POST',
      timeout: 25000,
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      beforeSend: function beforeSend() {
        if (request.loading && !spinning) {
          spinner.start()
        }
      },
      complete: function complete() {
        setTimeout(() => {
          spinner.close()
        }, 50000)
      }
    }

    if (!url) {
      throw new Error(`

        请提供请求地址...
      `)
    }

    request.error = (xhr) => {
      reject(xhr)
    }

    request.success = (data) => {
      resolve(data)
    }

    $.ajax(Object.assign(ajaxSettings, request))
  })
}

window.$ = $
window.utils = utils

export default fetch
