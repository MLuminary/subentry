import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'GET', url } = config

  const request = new XMLHttpRequest()

  request.open(method.toLocaleUpperCase(), url, true)

  request.send(data)
}
