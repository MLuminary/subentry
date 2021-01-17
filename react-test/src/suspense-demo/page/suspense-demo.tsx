import React from 'react'
import { createFetcher, Placeholder } from '../suspense'

const fetchAPi = () => {
  // api 需要返回 promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('加载完毕')
    }, 1000)
  })
}

const getDate = createFetcher(fetchAPi)

const Inner = () => {
  return <h1>{getDate()}</h1>
}

export class SuspenseDemo extends React.Component {
  render() {
    return (
      <Placeholder>
        <Inner />
      </Placeholder>
    )
  }
}
