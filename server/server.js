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
  all: [],
}

let N = 1
let P = 1

const getNormalPassword = () => {
  const value = `N${N++}`
  passwords['normal'].push(value)
  passwords['all'].push(value)
}

const getPrioritaryPassword = () => {
  const value = `P${P++}`
  passwords['prioritary'].push(value)
  passwords['all'].push(value)
}

const getData = data => {
  data === 'normal' ? getNormalPassword() : getPrioritaryPassword()
}

io.on('connection', socket => {
  console.log('[IO] Connection => server has a new connection')

  socket.on('password.send', data => {
    console.log('[SOCKET] password type => ', data)

    console.log(passwords)

    getData(data)
    io.sockets.emit('object.passwords', passwords)
  })

  socket.on('password.next', data => {
    console.log(data)
    io.sockets.emit('password.next', true)
  })

  socket.on('disconnect', () => {
    console.log('[SOCKET] User Disconnect')
  })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('[http] server running...')
})
