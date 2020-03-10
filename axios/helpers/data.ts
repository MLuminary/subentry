import { isObject } from './utils'

export const transformRequest = (data: any): any => {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
