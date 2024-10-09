// UDP server
import dgram from 'dgram'
import logger from 'src-electron/logger'
import { fnPlayer } from '../player'

const server = dgram.createSocket('udp4')

const fnInitUdpServer = (port) => {
  server.on('error', (err) => {
    logger.error(`server error:\n${err.stack}`)
    server.close()
  })

  server.on('message', (msg, rinfo) => {
    fnPlayer(JSON.parse(msg.toString().replace(/\0/g, '').trim()))
  })

  server.on('listening', () => {
    const address = server.address()
    logger.info(`udp server listening ${address.address}:${address.port}`)
  })

  server.bind(port, '127.0.0.1')
}

export { fnInitUdpServer }
