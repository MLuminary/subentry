import { AxiosResponse } from '../types/index'
import { flattenHeaders } from '../helpers/header'
import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'
import { transform } from './transform'

export const dispatchRequest = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method || 'get')
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildURL(url!, params)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
