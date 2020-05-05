import { ResolvedFn, RejectedFn } from './../types'
import { isFormData } from './../helpers/utils'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { cookie } from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'GET', url } = config

    const request = new XMLHttpRequest()

    request.open(method.toLocaleUpperCase(), url!, true)

    configureRequest(request, config)

    addEvent(request, config, resolve, reject)

    processHeader(request, config)

    processCancel(request, config, reject)

    request.send(data)
  })
}

const configureRequest = (request: XMLHttpRequest, config: AxiosRequestConfig): void => {
  const { responseType, timeout, withCredentials } = config

  if (responseType) {
    request.responseType = responseType
  }

  if (timeout) {
    // 设置过期时间
    request.timeout = timeout
  }

  if (withCredentials) {
    request.withCredentials = withCredentials
  }
}

const addEvent = (
  request: XMLHttpRequest,
  config: AxiosRequestConfig,
  resolve: ResolvedFn,
  reject: RejectedFn
): void => {
  const { responseType, onUploadProgress, onDownloadProgress } = config

  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return
    }
    // 如果 XMLHttpRequest 出错
    if (request.status === 0) {
      return
    }

    const responseHeaders = parseHeaders(request.getAllResponseHeaders())
    const responseData =
      responseType && responseType !== 'text' ? request.response : request.responseText
    const response: AxiosResponse = {
      data: responseData,
      status: request.status,
      statusText: request.statusText,
      headers: responseHeaders,
      config,
      request
    }

    handleResponse(response, resolve, reject, config, request)
  }

  if (onDownloadProgress) {
    request.onprogress = onDownloadProgress
  }

  if (onUploadProgress) {
    request.upload.onprogress = onUploadProgress
  }

  request.ontimeout = () => {
    reject(createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request))
  }

  request.onerror = () => {
    reject(createError('Network Error', config, null, request))
  }
}

const processHeader = (request: XMLHttpRequest, config: AxiosRequestConfig): void => {
  const { data, url, headers, withCredentials, xsrfCookieName, xsrfHeaderName } = config
  if (isFormData(data)) {
    // 浏览器会自动设置为 multipart/form-data
    delete headers['Content-Type']
  }

  // 预防 xsrf
  if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
    const xsrfValue = cookie.read(xsrfCookieName)
    if (xsrfValue) {
      headers[xsrfHeaderName!] = xsrfValue
    }
  }

  // set headers
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
}

const processCancel = (request: XMLHttpRequest, config: AxiosRequestConfig, reject: RejectedFn) => {
  const { cancelToken } = config
  if (cancelToken) {
    // promise 由 pending -> resolved 时执行
    cancelToken.promise.then(reason => {
      request.abort()
      reject(reason)
    })
  }
}

const handleResponse = (
  response: AxiosResponse,
  resolve: ResolvedFn,
  reject: RejectedFn,
  config: AxiosRequestConfig,
  request: XMLHttpRequest
) => {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(
      createError(
        `Request failed with status code ${response.status}`,
        config,
        null,
        request,
        response
      )
    )
  }
}
