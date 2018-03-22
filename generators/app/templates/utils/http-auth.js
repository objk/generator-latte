import $ from 'zepto'
import spinner from './spinner'
import initAuth from '../services/initAuth'
import utils from './index'

const fetch = function fetch(url = '', options = {}) {
  return initAuth().then(() => new Promise((resolve, reject) => {
    const request = options || {}

    // is current spinning
    const spinning = !!document.getElementById('js-spinner')

    // is show spinning when make ajax request
    request.loading = (options.loading === false) !== true

    request.url = url

    const ajaxSettings = {
      type: 'POST',
      timeout: 50000,
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
        spinner.close()
      },
    }

    if (!url) {
      throw new Error(`

        请提供请求地址...
      `)
    }

    request.error = (xhr) => {
      // handle error response

      reject(xhr)
    }

    request.success = (data) => {
      if (data.responseCode !== '000000') {
        // handle error response

        return
      }

      resolve(data)
    }

    $.ajax(Object.assign(ajaxSettings, request))
  }))
}

window.$ = $
window.utils = utils

export default fetch
