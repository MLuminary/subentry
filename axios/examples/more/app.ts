import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AxiosError } from '../../src/helpers/error'
import qs from 'qs'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios
  .post(
    'http://127.0.0.1:8088/more',
    {},
    {
      withCredentials: true
    }
  )
  .then(res => {
    console.log(res)
  })

const instance1 = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance1.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance1.defaults.onDownloadProgress = update
    instance1.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance1.interceptors.response.use(
      response => {
        NProgress.done()
        return response
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance1.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance1.post('/more/upload', data)
  }
})

axios
  .post(
    '/more/post',
    {
      a: 1
    },
    {
      auth: {
        username: 'haoqin',
        password: '123456'
      }
    }
  )
  .then(res => {
    console.log(res)
  })

axios
  .get('/more/304')
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('/more/get', {
    params: new URLSearchParams('a=b&c=d')
  })
  .then(res => {
    console.log(res)
  })

axios
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(res => {
    console.log(res)
  })

const instance = axios.create({
  paramsSerializer(params) {
    // 数组的编码格式 c: [1, 2, 3] => c[]=1&c[]=2&c[]=3
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(res => {
    console.log(res)
  })

const instance2 = axios.create({
  baseURL: 'https://img.mukewang.com/'
})

instance2.get('5cc01a7b0001a33718720632.jpg')

instance2.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')
