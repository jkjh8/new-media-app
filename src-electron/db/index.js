import { app } from 'electron'
import path from 'path'
import datastore from 'nedb-promises'
import logger from 'src-electron/logger'

let db = {}

const fnCreateDB = (file) => {
  const dbPath = path.join(app.getPath('userData'), file)
  logger.info(`DB Path: ${dbPath}`)
  return datastore.create({
    filename: dbPath,
    timestampData: true,
    autoload: true
  })
}

const initializeDatabase = (name, file) => {
  db[name] = fnCreateDB(file)
  logger.info(`DB ${name.charAt(0).toUpperCase() + name.slice(1)} initialized`)
}

const fnInitDB = () => {
  try {
    initializeDatabase('setup', 'setup.db')
    initializeDatabase('playlist', 'playlist.db')
    initializeDatabase('files', 'files.db')
  } catch (error) {
    logger.error(`DB Error: ${error}`)
  }
}

export default db
export { fnInitDB }
