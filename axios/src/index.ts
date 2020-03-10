import { transformRequest } from './../helpers/data'
import { buildURL } from './../helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

export const axios = (config: AxiosRequestConfig) => {
  processConfig(config)
  xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
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

export default axios
