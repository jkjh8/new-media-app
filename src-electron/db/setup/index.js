import db from 'src-electron/db'
import logger from 'src-electron/logger'

const dbSetupUpdate = async (key, value) => {
  try {
    await db.setup.update({ key }, { $set: { value } }, { upsert: true })
  } catch (error) {
    logger.error(`dbSetupUpdate Error: ${error}`)
  }
}

const dbSetupFind = async (key) => {
  try {
    return await db.setup.findOne({ key })
  } catch (error) {
    logger.error(`dbSetupFind Error: ${error}`)
  }
}

export { dbSetupUpdate, dbSetupFind }
