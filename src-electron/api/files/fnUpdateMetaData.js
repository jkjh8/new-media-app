import ffmpeg from 'fluent-ffmpeg'
import logger from 'src-electron/logger'
import db from 'src-electron/db'

export const fnUpdateMetaData = async (file) => {
  try {
    const meta = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(file.path.fullpath, (err, meta) => {
        if (err) reject(err)
        resolve(meta)
      })
    })
    await db.files.update({ file: file.file }, { $set: { meta } })
  } catch (err) {
    logger.error(`ffprobe Error: ${err}`)
  }
}
