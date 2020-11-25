const cached = {}

export const createFetcher = <T>(promiseTask: () => Promise<T>) => {
  let ref = cached
  return () => {
    const task = promiseTask()
    task.then(res => {
      ref = res
    })
    if (ref === cached) {
      // 将 promise 当异常抛出
      throw task
    }
    return ref
  }
}