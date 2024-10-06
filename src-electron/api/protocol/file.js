import { protocol } from 'electron'
import logger from 'src-electron/logger'

export default LocalProtocol = () => {
  protocol.registerFileProtocol('local', (req, cb) => {
    const pathname = decodeURIComponent(req.url.replace('local://', ''))
    try {
      cb(pathname)
    } catch (err) {
      logger.error(`local file protocol loading faild: ${err}`)
    }
  })
  logger.info('local file protocol registered')
}
