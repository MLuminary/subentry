type Observer = {
  next?: (value: any) => void,
  error?: (error) => void,
  complete?: () => void
}

type Subscribe = (observer: Observer) => () => void

class SafeObserver {
  private destination: Observer
  private isUnsubscribed: boolean = false
  constructor(destination: Observer) {
    this.destination = destination
  }

  next(value: any) {
    if (this.destination.next && !this.isUnsubscribed) {
      this.destination.next(value)
    }
  }

  error(err: Error) {
    if (!this.isUnsubscribed) {
      this.isUnsubscribed = true
      if (this.destination.error) {
        this.destination.error(err)
      }
    }
  }

  complete() {
    if (!this.isUnsubscribed) {
      this.isUnsubscribed = true
      if (this.destination.complete) {
        this.destination.complete()
      }
    }
  }
}

class Observable {
  private _subscribe: Subscribe
  constructor(_subscribe: Subscribe) {
    this._subscribe = _subscribe
  }

  subscribe(observer: any) {
    const safeObserver = new SafeObserver(observer)
    return this._subscribe(safeObserver)
  }
}

const simpleObservable = new Observable((observer: Observer) => {
  let i = 0

  const id = setInterval(() => {
    if (i < 10) {
      observer.next(i++)
    } else {
      observer.complete()
      observer.next('do not show me')
      clearInterval(id)
    }
  }, 100)

  return () => {
    console.info('disposed!')
    // 提前中断
    clearInterval(id)
  }
})

const observer: Observer = {
  next: (value: any) => console.info(value),
  error: () => {},
  complete: () => console.info('complete')
}

const clear = simpleObservable.subscribe(observer)

setTimeout(() => {
  clear()
}, 500)
