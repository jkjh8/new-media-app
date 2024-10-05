import { BrowserWindow as bw, ipcMain } from 'electron'
import logger from 'src-electron/logger'
import db from 'src-electron/db'

const fnInitIPC = () => {
  ipcMain.handle('getFiles', async () => {
    return await db.files.find({})
  })
}

const fnSendData = (data) => {
  bw.fromId(1).webContents.send('info', data)
}

export { fnInitIPC, fnSendData }
