export const getAjaxRequest = (): Promise<JasmineAjaxRequest> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // 拿到最近一次请求的 request 对象
      return resolve(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
