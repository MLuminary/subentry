import { CancelExecutor, CancelTokenSource, Canceler, Cancel as CancelTypes } from './../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: CancelTypes): void
}

export default class CancelToken {
  promise: Promise<CancelTypes>
  reason?: CancelTypes

  constructor(executor: CancelExecutor) {
    // 用于保存 pending 状态 promise 的 resolve 方法
    let resolvePromise: ResolvePromise
    // 建立 Pending 状态的 promise
    this.promise = new Promise<CancelTypes>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
