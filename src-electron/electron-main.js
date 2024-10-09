import { app, BrowserWindow } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import os from 'os'

import logger from './logger'
import { fnInitDB } from './db'
import { fnInitFolders } from './api/files'
import { fnInitFiles } from './api/files'
import { fnInitIPC } from './ipc'
import { fnInitDefault } from './api/setup'
import fileProtocal from './api/protocol/file'

import { fnInitUdpServer } from './api/udp'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

let mainWindow
// initialize the database
fnInitDB()
// initialize the folders
fnInitFolders()
// initialize the default values
fnInitDefault()

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1920,
    height: 1080,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('enter-full-screen', () => {
    if (platform !== 'darwin') {
      mainWindow.setMenuBarVisibility(false)
    }
  })

  mainWindow.on('leave-full-screen', () => {
    if (platform !== 'darwin') {
      mainWindow.setMenuBarVisibility(true)
    }
  })
  // initialize the IPC
  fnInitIPC()
  // initialize the files
  fnInitFiles()
  // initialize the UDP server
  fnInitUdpServer(41234)
}

app.whenReady().then(async () => {
  // set file protocol
  fileProtocal()
  // install Vue Devtools
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
