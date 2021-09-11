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
  | ((value: T) => T | PromiseLike<T> | MyPromise<T> | void)
  | null
  | undefined
export type OnRejected<T> = ((reason: any) => PromiseLike<T> | void | MyPromise<T>) | null | undefined

abstract class MyPromiseAdaptor<T> {
  protected state: State
  protected value: any
  protected onFulfilled: any[]
  protected onRejected: any[]

  then: (onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected<T>) => MyPromise<T>
}

class MyPromise<T> extends MyPromiseAdaptor<T> {

  constructor(executor: Executor<T>) {
    super()
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

  _updateResult = (value: any, state: State) => {
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
    this._updateResult(value, State.FULFILLED)
  }

  _reject = (error: any) => {
    this._updateResult(error, State.REJECTED)
  }
  /**
   *
   * @param promise2
   * @param x promise2 的返回值
   * @param resolve promise2 的 resolve
   * @param reject promise2 的 reject
   */
  _resolvePromise<T>(
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
              this._resolvePromise(promise2, y, resolve, reject)
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

  then = (onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected<T>): MyPromise<T> => {
    const _onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value

    const _onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason: any) => {
          throw reason
        }

    const promise2 = new MyPromise<T>((resolve, reject) => {
      if (this.state === State.PENDING) {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              const x = _onFulfilled(this.value)
              this._resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = _onRejected(this.value)
              this._resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.state === State.FULFILLED) {
        setTimeout(() => {
          try {
            const x = _onFulfilled(this.value)
            this._resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === State.REJECTED) {
        setTimeout(() => {
          try {
            const x = _onRejected(this.value)
            this._resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }

  static resolve = <T>(param: T): MyPromise<T> => {
    if (param instanceof MyPromise) {
      return param
    }

    return new MyPromise((resolve) => {
      resolve(param)
    })
  }

  static reject = <T>(reason): MyPromise<T> => {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all = <T>(...values: (T | PromiseLike<T>)[]): MyPromise<T[]> => {
    return new MyPromise((resolve, reject) => {
      let count = 0
      const result = []
      const length = values.length

      values.forEach((value, index) => {
        MyPromise.resolve(value).then(res => {
          result[index] = res
          count++
          if (count === length) {
            resolve(result)
          }
        }, reject)
      })
    })
  }

  finally = (callback: Function): MyPromise<T> => {
    return this.then((value) => {
      return MyPromise.resolve(callback()).then(() => value)
    }, (reason) => {
      return MyPromise.resolve(callback()).then(() => reason)
    })
  }

  static race = <T>(values: (T | PromiseLike<T>)[]): MyPromise<T> => {
    return new MyPromise((resolve, reject) => {
      if (values.length === 0) {
        return
      } else {
        for (let i = 0; i < values.length; i++) {
          MyPromise.resolve(values[i]).then(res => {
            resolve(res)
            return
          }, reject)
        }
      }
    })
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
