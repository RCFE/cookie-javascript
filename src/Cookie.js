function assign () {
  let to = {}
  for (let i = 0; i < arguments.length; i++) {
    let nextSource = arguments[i]
    for (let nextKey in nextSource) {
      if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
        to[nextKey] = nextSource[nextKey]
      }
    }
  }
  return to
}

function api (converter) {
  class Cookie {
    set (key, value, options = {}) {
      /* eslint no-useless-escape: off */
      if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
        return
      }
      let expires = ''
      let sExpires = options.expires
      let result
      if (sExpires) {
        switch (sExpires.constructor) {
          case Number:
            if (sExpires === Infinity) {
              expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            } else {
              let date = new Date()
              date.setMilliseconds(date.getMilliseconds() + sExpires * 864e+5)
              expires = `; expires=${date.toUTCString()}`
              options.maxAge = sExpires * 24 * 60 * 60
            }
            break
          case String:
            expires = `; expires=${sExpires}`
            break
          case Date:
            expires = `; expries=${sExpires.toUTCString()}`
            break
        }
      }
      try {
        result = JSON.stringify(value)
        if (/^[\{\[\"]/.test(result)) {
          value = result
        }
      } catch (e) {
        console.error(e)
      }
      if (!converter.write) {
        value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
      } else {
        value = converter.write(key, value)
      }
      key = encodeURIComponent(String(key))
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
      key = key.replace(/[\(\)]/g, escape)
      document.cookie = key + '=' + value + expires + (options.maxAge ? '; max-age=' + options.maxAge : '') + (options.domain ? '; domain=' + options.domain : '') + (options.path ? '; path=' + options.path : '') + (options.secure === true ? '; ' + options.secure : '')
    }
    get (key = '__default__cookie__key__', options = {json: false}) {
      if (typeof key === 'object') {
        options = key
        key = '__default__cookie__key__'
      }
      let result = {}
      const cookies = document.cookie ? document.cookie.split('; ') : []
      const rdecode = /(%[0-9A-Z]{2})+/g
      for (let i = 0, len = cookies.length; i < len; i++) {
        let parts = cookies[i].split('=')
        let cookie = parts.slice(1).join('=')
        try {
          let name = parts[0].replace(rdecode, decodeURIComponent)
          cookie = cookie.replace(rdecode, decodeURIComponent)
          cookie = (converter.read ? converter.read(name, cookie) : converter(name, cookie)) || cookie
          if ((!options || !options.json) && typeof cookie === 'string' && cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1)
          }
          if (options && options.json) {
            try {
              cookie = JSON.parse(cookie)
            } catch (e) {
              console.error(e)
            }
          }
          if (key === name) {
            result = cookie
            break
          }
          if (key === '__default__cookie__key__') {
            result[name] = cookie
          }
        } catch (e) {
          console.error(e)
        }
      }
      return result
    }
    remove (key = '__default__cookie__key__', options = {}) {
      if (typeof key === 'object') {
        options = key
        key = '__default__cookie__key__'
      }
      if (key === '__default__cookie__key__') {
        let keys = Object.keys(this.get({json: true}))
        for (let i = 0, len = keys.length; i < len; i++) {
          let skey = keys[i]
          this.set(skey, '', assign(options, {
            expires: -1,
            maxAge: 0
          }))
        }
        return
      }
      this.set(key, '', assign(options, {
        expires: -1,
        maxAge: 0
      }))
    }
  }
  Cookie.prototype.withConverter = api
  return new Cookie()
}
export default api(function () {})
