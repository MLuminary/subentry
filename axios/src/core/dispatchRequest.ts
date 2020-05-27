import { isAbsoluteURL, combineURL } from './../helpers/url'
import { AxiosResponse } from '../types/index'
import { flattenHeaders } from '../helpers/header'
import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'
import { transform } from './transform'

export const dispatchRequest = (config: AxiosRequestConfig): AxiosPromise => {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config)
    .then(res => transformResponseData(res))
    .catch(e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    })
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export const transformUrl = (config: AxiosRequestConfig) => {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

// 如果 cancelToken 之前已被使用过，则不发此次请求
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
