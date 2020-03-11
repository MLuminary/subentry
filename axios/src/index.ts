import { processHeaders } from './../helpers/header'
import { transformRequest } from './../helpers/data'
import { buildURL } from './../helpers/url'
import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'

export const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestBody(config)
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildURL(url, params)
}

const transformRequestBody = (config: AxiosRequestConfig) => {
  const { data } = config
  return transformRequest(data)
}

const transformHeaders = (config: AxiosRequestConfig) => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
