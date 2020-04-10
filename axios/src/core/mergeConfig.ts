import { AxiosRequestConfig } from './../types'
import { isObject, deepMerge } from '../helpers/utils'

type ValueFromConfig2KeysType = Array<keyof Pick<AxiosRequestConfig, 'method' | 'data'>>
type MergeDeepPropertiesKeysType = Array<keyof Pick<AxiosRequestConfig, 'headers' | 'params'>>

export const mergeConfig = (
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig = {}
): AxiosRequestConfig => {
  const config = Object.create(null)

  const valueFromConfig2Keys: ValueFromConfig2KeysType = ['method', 'data']
  const mergeDeepPropertiesKeys: MergeDeepPropertiesKeysType = ['headers', 'params']
  // 用户可能配置带 query 的 url
  const defaultToConfig2Keys = [
    'baseURL',
    'url',
    'transformRequest',
    'transformResponse',
    'paramsSerializer',
    'timeout',
    'withCredentials',
    'adapter',
    'responseType',
    'xsrfCookieName',
    'xsrfHeaderName',
    'onUploadProgress',
    'onDownloadProgress',
    'maxContentLength',
    'maxBodyLength',
    'validateStatus',
    'maxRedirects',
    'httpAgent',
    'httpsAgent',
    'cancelToken',
    'socketPath',
    'responseEncoding'
  ]

  valueFromConfig2Keys.forEach(key => {
    if (typeof config2[key] !== 'undefined') {
      config[key] = config2[key]
    }
  })

  mergeDeepPropertiesKeys.forEach(key => {
    if (isObject(config2[key])) {
      config[key] = deepMerge(config1[key], config2[key])
    } else if (typeof config2[key] !== 'undefined') {
      config[key] = config2[key]
    } else if (isObject(config1[key])) {
      config[key] = deepMerge(config1[key])
    } else if (typeof config1[key] !== 'undefined') {
      config[key] = config1[key]
    }
  })

  defaultToConfig2Keys.forEach(key => {
    if (typeof config2[key] !== 'undefined') {
      config[key] = config2[key]
    } else if (typeof config1[key] !== 'undefined') {
      config[key] = config1[key]
    }
  })

  return config
}
