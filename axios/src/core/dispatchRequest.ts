import { AxiosResponse } from '../types/index'
import { processHeaders, flattenHeaders } from '../helpers/header'
import { transformRequest, transformResponse } from '../helpers/data'
import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'

export const dispatchRequest = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestBody(config)
  config.headers = flattenHeaders(config.headers, config.method || 'get')
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildURL(url!, params)
}

const transformRequestBody = (config: AxiosRequestConfig) => {
  const { data } = config
  return transformRequest(data)
}

const transformHeaders = (config: AxiosRequestConfig) => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}
