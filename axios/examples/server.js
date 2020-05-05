const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const path = require('path')

const app = express()
const compiler = webpack(WebpackConfig)

require('./server2')

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  multipart({
    uploadDir: path.resolve(__dirname, 'upload-file')
  })
)

const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    chunk && msg.push(chunk)
  })

  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.get('/interceptor/get', function(req, res) {
  res.end('hello')
})

router.post('/config/post', function(req, res) {
  res.json(req.body)
})

router.get('/cancel/get', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: 'hello'
    })
  }, 300)
})

router.get('/more/get', function(req, res) {
  res.json(req.cookies)
})

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})

// 模拟后端返回 token 插入到 cookie 中
app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', '1234abc')
    }
  })
)

app.use(router)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = process.env.PORT || 3000
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
