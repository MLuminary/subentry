import { Method } from './../types/index'
import { isObject, deepMerge } from './utils'

const DEFAULT_HEADER_CONTENT_TYPE = 'application/json;charset=utf-8'

const normalizeHeaderName = (headers: any, normalizedName: string): void => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = (headers: any, data: any): void => {
  normalizeHeaderName(headers, 'Content-Type')

  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = DEFAULT_HEADER_CONTENT_TYPE
    }
  }
}

export const parseHeaders = (headers: string): any => {
  let parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    // header 的值可能含有多个 ':'
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()

    if (!key) {
      return
    }

    let val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}

export const flattenHeaders = (headers: any, method: Method): any => {
  if (!headers) {
    return
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
