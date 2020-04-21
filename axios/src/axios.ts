import { mergeConfig } from './core/mergeConfig'
import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

const createInstance = (config: AxiosRequestConfig): AxiosStatic => {
  const context = new Axios(config)
  // 将 request 方法拿出
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
