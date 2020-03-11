import { isObject } from './utils'

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

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type')

  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = DEFAULT_HEADER_CONTENT_TYPE
    }
  }
  return headers
}

export const parseHeaders = (headers: string): any => {
  let parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()

    if (!key) {
      return
    }

    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}
