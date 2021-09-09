export enum State {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export type Resolve<T> = (value?: T | PromiseLike<T>) => void
export type Reject = (reason?: any) => void

// overwrite PromiseLike
export type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

export type ResolveValue<T> = T | PromiseLike<T>

export type OnFulfilled<T> =
  | ((value: unknown) => T | PromiseLike<T>)
  | null
  | undefined
export type OnRejected<T> = ((reason: any) => PromiseLike<T>) | null | undefined

class MyPromise<T> {
  private state: State
  private value: any
  private onFulfilled: any[]
  private onRejected: any[]
  constructor(executor: Executor<T>) {
    this.state = State.PENDING
    this.value = undefined
    this.onFulfilled = [] // 同一个 promise 可以有多个 then，需要顺序执行，所以这里是数组
    this.onRejected = []

    try {
      executor(this._resolve, this._reject)
    } catch (err) {
      this._reject(err)
    }
  }

  updateResult = (value: any, state: State) => {
    /*
      Process the promise if it is still in pending state.
      An already rejected or resolved promise is not processed
    */
    if (this.state !== State.PENDING) {
      return
    }

    this.value = value
    this.state = state
    // execute handlers
    if (state === State.FULFILLED) {
      this.onFulfilled.forEach((callback) => callback())
    } else {
      this.onRejected.forEach((callback) => callback())
    }
  }

  _resolve = (value: any) => {
    this.updateResult(value, State.FULFILLED)
  }

  _reject = (error: any) => {
    this.updateResult(error, State.REJECTED)
  }
  /**
   *
   * @param promise2
   * @param x promise2 的返回值
   * @param resolve promise2 的 resolve
   * @param reject promise2 的 reject
   */
  resolvePromise<T>(
    promise2: MyPromise<T>,
    x: any,
    resolve: Resolve<T>,
    reject: Reject
  ) {
    if (promise2 === x) {
      reject(new TypeError('the promise and the return value are the same'))
    }

    if (x && (typeof x === 'object' || typeof x === 'function')) {
      let used: any
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            (y: any) => {
              if (used) return
              this.resolvePromise(promise2, y, resolve, reject)
              used = true
            },
            (r: any) => {
              if (used) return
              used = true
              reject(r)
            }
          )
        } else {
          if (used) return
          used = true
          resolve(x)
        }
      } catch (e) {
        if (used) return
        used = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

  then = (onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected<T>) => {
    const _onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value

    const _onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason: any) => {
          throw reason
        }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === State.PENDING) {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              const x = _onFulfilled(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = _onRejected(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.state === State.FULFILLED) {
        setTimeout(() => {
          try {
            const x = _onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === State.REJECTED) {
        setTimeout(() => {
          try {
            const x = _onRejected(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.info(2)
    resolve(3)
  }, 0)
})

const promise2 = promise1.then((value) => {
  return new MyPromise((resolve) => {
    console.info(value)
    resolve(5)
    return
  })
})

promise2
  .then((value) => {
    console.info(value)
    return 6
  })
  .then((value) => {
    console.info(value)
  })


// @ts-ignore
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  // @ts-ignore
  dfd.promise = new MyPromise((resolve, reject) => {
    // @ts-ignore
    dfd.resolve = resolve
    // @ts-ignore
    dfd.reject = reject
  })
  return dfd
}

// @ts-ignore
module.exports = MyPromise
