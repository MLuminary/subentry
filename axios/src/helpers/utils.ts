const toString = Object.prototype.toString

export const isDate = (val: any): val is Date => {
  return toString.call(val) === '[object Date]'
}

export const isObject = (val: any): val is Object => {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as U & T)[key] = from[key] as any
  }
  return to as T & U
}

export const deepMerge = (...objs: any[]) => {
  const result = {} as any

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        if (isObject(obj[key]) && isObject(result[key])) {
          result[key] = deepMerge(result[key], obj[key])
        } else if (isObject(obj[key])) {
          result[key] = deepMerge({}, obj[key])
        } else {
          result[key] = obj[key]
        }
      })
    }
  })

  return result
}

export const isFormData = (val: any): boolean => {
  return val instanceof FormData
}

// 可以让传入的值的类型变为 URLSearchParams
export const isURLSearchParams = (val: any): val is URLSearchParams => {
  return val instanceof URLSearchParams
}
