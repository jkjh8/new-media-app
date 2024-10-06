import { BrowserWindow as bw, ipcMain } from 'electron'
import defaultValue from 'src-electron/default'
import logger from 'src-electron/logger'
import db from 'src-electron/db'

const fnInitIPC = () => {
  // get files
  ipcMain.handle('getFiles', async () => {
    return await db.files.find({})
  })

  // get setup
  ipcMain.handle('getSetup', async () => {
    return defaultValue
  })

  // audioDevices
  ipcMain.on('audioDevices', (event, value) => {
    defaultValue.audioDevices = JSON.parse(value)
  })

  // update video player
  ipcMain.on('video', (e, args) => {
    console.log(args)
    for (const key in args) {
      defaultValue.video[key] = args[key]
    }
  })
}

const fnSendIPC = (key, value) => {
  bw.fromId(1).webContents.send(key, value)
}

export { fnInitIPC, fnSendIPC }
