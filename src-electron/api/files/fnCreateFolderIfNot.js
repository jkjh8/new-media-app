import fs from 'fs'
import logger from 'src-electron/logger'

export const fnCreateFolderIfNot = (folderPath, folderName) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
  logger.info(`${folderName}: ${folderPath}`)
}
