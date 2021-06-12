const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const novel = require('./routes/novel.js')

const app = new Koa()

// error handler
onerror(app)

app.use(bodyparser())
app.use(json())

app.use(
  cors({
    origin: 'http://106.13.2.80:1234',
    maxAge: 5,
    credentials: true,
    allowMethods: ['POST'],
    allowHeaders: ['Content-Type', 'X-Requested-With', 'Accept']
  })
)

// routes
app.use(novel.routes(), novel.allowedMethods())

app.use(async ctx => {
  ctx.body = `error: ${ctx.status}`
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

app.listen(9966)

console.log('app: fate-book-reader, port: 9966')

module.exports = app
