const koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

const express = require('express')
const cors = require('cors')
const api = express()

const PORT = process.env.PORT || 8877

const passwords = {
  normal: [],
  prioritary: [],
}

let N = 1
let P = 1

io.on('connection', socket => {
  console.log('[IO] Connection => server has a new connection')

  socket.on('password.send', data => {
    data === 'normal'
      ? passwords['normal'].push(`N${N++}`)
      : passwords['prioritary'].push(`P${P++}`)
    console.log('[SOCKET] password type => ', data)
    console.log(passwords)
  })

  socket.on('disconnect', () => {
    console.log('[SOCKET] User Disconnect')
  })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('[http] server running...')
})

// API
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  api.use(cors())
  next()
})

api.get('/', (req, res) => {
  res.json({
    msg: 'OK',
  })
})

api.get('/passwords', (req, res) => {
  res.json(passwords)
})

api.listen(PORT, () => {
  console.log('[API] Executando na porta: ' + PORT)
})
