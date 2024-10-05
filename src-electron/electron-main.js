import { app, BrowserWindow } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import os from 'os'

import logger from './logger'
import { fnInitDB } from './db'
import { fnInitFolders } from './api/files'
import { fnInitFiles } from './api/files'
import { fnInitIPC } from './ipc'
// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

let mainWindow
// initialize the database
fnInitDB()
// initialize the folders
fnInitFolders()

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  // if (process.env.DEBUGGING) {
  //   // if on DEV or Production with debug enabled
  //   mainWindow.webContents.openDevTools()
  // } else {
  //   // we're on production; no access to devtools pls
  //   mainWindow.webContents.on('devtools-opened', () => {
  //     mainWindow.webContents.closeDevTools()
  //   })
  // }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // initialize the IPC
  fnInitIPC()
  // initialize the files
  fnInitFiles()
}

app.whenReady().then(async () => {
  if (process.env.DEBUGGING) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (error) {
      logger.error('Vue Devtools failed to install:', error.toString())
    }
  }
  createWindow()
  import('./web')
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
