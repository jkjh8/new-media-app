import logger from 'src-electron/logger'
import { BrowserWindow as bw } from 'electron'
import { fnSendIPC } from 'src-electron/ipc'
import defaultValue from 'src-electron/default'
import { dbSetupUpdate } from 'app/src-electron/db/setup'

const theme = ['dark', 'light']
const mode = ['video', 'audio', 'logo', 'photo']

const fnPlayer = async (obj) => {
  console.log(obj)
  try {
    switch (obj.command) {
      case 'play':
      case 'pause':
      case 'stop':
        fnSendIPC('player', { ...obj })
        break
      // theme dark or light, mode
      case 'theme':
        if (!theme.includes(obj.value)) logger.warn('Unknown theme', obj)

      case 'mode':
        if (!mode.includes(obj.value)) logger.warn('Unknown mode', obj)
        defaultValue[obj.command] = obj.value
        await dbSetupUpdate(obj.command, obj.value)
        fnSendIPC('setup', { ...obj })
        break
      // fullscreen
      case 'fullscreen':
        defaultValue[obj.command] = obj.value
        await dbSetupUpdate(obj.command, obj.value)
        bw.fromId(1).setFullScreen(obj.value)
        fnSendIPC('setup', { ...obj })
        break
      default:
        logger.warn('Unknown command', obj)
        break
    }
  } catch (error) {
    logger.error(`fnPlayer Error: ${error}`)
  }
}

export { fnPlayer }
