import React from 'react'

type Props = {
  fallback?: () => JSX.Element
}

type State = {
  isLoading: boolean
}

export class Placeholder extends React.Component<Props, State> {
  private _mounted: boolean = false
  state = {
    isLoading: false,
  }

  componentDidCatch(error: any) {
    if (this._mounted) {
      console.info(typeof error.then)
      // 捕获抛出的 promise 并将 isLoading 设置为 true
      if (typeof error.then === 'function') {
        this.setState({ isLoading: true })
        error.then(() => {
          if (this._mounted) {
            this.setState({ isLoading: false })
          }
        })
      }
    }
  }

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    console.info('unMount')
    this._mounted = false
  }

  render() {
    const { isLoading } = this.state

    return isLoading ? '加载中' : this.props.children
  }
}
