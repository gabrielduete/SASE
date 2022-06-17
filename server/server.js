const koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

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
    console.log('[SOCKET SERVER] New password type => ', data)

    getData(data)
    io.sockets.emit('object.passwords', passwords)
  })

  socket.on('password.next', data => {
    const firstPassword = passwords['all'][0]
    passwords['all'].splice(0, 1)

    io.sockets.emit('password.next', firstPassword)
    io.sockets.emit('password.tv.update', firstPassword)
    io.sockets.emit(`password.tv.${data}`, firstPassword)
  })

  socket.on('disconnect', () => {
    console.log('[SOCKET SERVER] User Disconnect')
  })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('[http] server running...')
})
