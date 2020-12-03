import { Observable, of } from 'rxjs'

const source$ = of(1, 2, 3)
/**
 * 自定义 map 操作符
 */

function myMap<T>(func: (value: T) => any) {
  return (ob: Observable<T>) => {
    return new Observable((observer) => {
      const sub = ob.subscribe({
        next: (value: T) => {
          try {
            observer.next(func(value))
          } catch (err) {
            observer.error(err)
          }
        },
        error: (err: any) => {
          observer.error(err)
        },
        complete: () => {
          observer.complete()
        }
      })

      return {
        unsubscribe: () => {
          sub.unsubscribe()
        }
      }
    })
  }
}

source$.pipe(myMap((value) => value * 2)).subscribe((value) => {
  console.info(value)
})
