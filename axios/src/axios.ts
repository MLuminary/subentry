import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

const createInstance = (): AxiosInstance => {
  const context = new Axios()
  // 将 request 方法拿出
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
