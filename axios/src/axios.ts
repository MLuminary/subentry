import { AxiosRequestConfig } from './types/index'
import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

const createInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const context = new Axios(config)
  // 将 request 方法拿出
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
