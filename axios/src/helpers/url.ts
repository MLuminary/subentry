import { isDate, isObject, isURLSearchParams } from './utils'

const encode = (val: string): string => {
  return encodeURIComponent(val) // 以下字符不需要被编码
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildURL = (url: string, params?: any, paramsSerializer?: (params: any) => string) => {
  if (!params) {
    return url
  }

  let serializedParams: string

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      let val = params[key]
      if (!val) return
      let values: string[]

      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(value => {
        if (isDate(value)) {
          value = value.toISOString()
        } else if (isObject(value)) {
          value = JSON.stringify(value)
        }
        parts.push(`${encode(key)}=${encode(value)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) url = url.slice(0, markIndex)
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

interface URLOrigin {
  protocol: string
  host: string
}

const resolveURL = (url: string): URLOrigin => {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}

export const isURLSameOrigin = (requestUrl: string): boolean => {
  const parsedOrigin = resolveURL(requestUrl)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
