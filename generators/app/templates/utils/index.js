/*
* @Author: WUZHILONG860
* @Date:   2017-12-25 12:29:50
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2017-12-29 18:35:23
*/
/* eslint-disable */
let utils = {
  isKDAPP() {
    return !!window.navigator.userAgent.toLowerCase().match('paebank')
  },

  isPALife() {
    return !!window.navigator.userAgent.toLowerCase().match('pars')
  },

  getSessionStorage(SessionKeyName) {
    let returnData = ''
    if (SessionKeyName) {
      let storageStr = sessionStorage.getItem(SessionKeyName)

      if (typeof storageStr === 'object') {
        returnData = JSON.parse(storageStr)
      } else {
        returnData = storageStr
      }

    }
    return returnData
  },

  setSessionStorage(sessionKeyName, sessionParam) {
    sessionKeyName = sessionKeyName || ''
    sessionParam = sessionParam || {}
    if (sessionKeyName) {
      if (typeof sessionParam === 'object') {
        sessionStorage.setItem(sessionKeyName, JSON.stringify(sessionParam))
      } else {
        sessionStorage.setItem(sessionKeyName, sessionParam)
      }
    }
  },

  getCookie(cookieName) {
    var cookie = document.cookie
    var cookiePos = cookie.indexOf(cookieName)

    if (cookiePos !== -1) {
      cookiePos += cookieName.length + 1
      var cookieEnd = cookie.indexOf(';', cookiePos)

      if (cookieEnd === -1) {
        cookieEnd = cookie.length
      }

      var value = unescape(cookie.substring(cookiePos, cookieEnd))

      return value
    }

    return ''
  }
}

export default utils

