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
let count = 0

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

const handleNextPassword = (data, firstPassword) => {
  io.sockets.emit('password.next', firstPassword)
  io.sockets.emit('password.tv.update', firstPassword)
  io.sockets.emit(`password.tv.${data}`, firstPassword)

  console.log(`[SOCKET] [SERVER] => NEXT PASSWORD ${firstPassword}`)
}

io.on('connection', socket => {
  console.log('[IO - CLIENT] Connection => server has a new connection')

  socket.on('password.send', data => {
    console.log('[SOCKET SERVER] New password type => ', data)

    getData(data)
    io.sockets.emit('object.passwords', passwords)
  })

  socket.on('password.next', data => {
    const firstPassword = passwords['all'][0]

    const isNormalPassword = firstPassword?.startsWith('N') && count < 2

    if (isNormalPassword) {
      handleNextPassword(data, firstPassword)
      passwords['all'].splice(0, 1)

      count++
    } else {
      for (let i = 0; i <= passwords['all'].length; i++) {
        const firstPassword = passwords['all'][i]

        if (passwords['all'][i]?.startsWith('P')) {
          handleNextPassword(data, firstPassword)
          passwords['all'].splice(i, 1)
          count = 0
          break
        }
      }

      count = 0
    }
  })

  socket.on('disconnect', () => {
    console.log('[SOCKET SERVER] User Disconnect')
  })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('[http] Server running...')
})

server.off('server.off', () => {
  console.log('[http] Server stopping...')
})
