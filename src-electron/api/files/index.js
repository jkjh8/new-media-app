import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import sizeOf from 'image-size'
import logger from 'src-electron/logger'
import db from 'src-electron/db'

import { fnCheckType } from './fnCheckType'
import { fnCreateFolderIfNot } from './fnCreateFolderIfNot'
import { fnDeleteDbFiles } from './fnDeleteDbFiles'
import { fnUpdateMetaData } from './fnUpdateMetaData'

ffmpeg.setFfmpegPath(require('ffmpeg-static').replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(require('ffprobe-static').path.replace('app.asar', 'app.asar.unpacked'))

const HomePath = app.getPath('home')
const MediaPath = path.join(HomePath, 'Media')
const FilesPath = path.join(MediaPath, 'Files')
const LogoPath = path.join(MediaPath, 'Logo')

const fnInitFolders = () => {
  try {
    fnCreateFolderIfNot(MediaPath, 'MediaPath')
    fnCreateFolderIfNot(FilesPath, 'FilesPath')
    fnCreateFolderIfNot(LogoPath, 'LogoPath')
  } catch (error) {
    logger.error(`Init folders Error: ${error}`)
  }
}

const fnInitFiles = async () => {
  try {
    const files = fs.readdirSync(FilesPath)
    await fnDeleteDbFiles(files)
    for (const file of files) {
      const fullpath = path.join(FilesPath, file)
      const parsed = path.parse(fullpath)
      const stat = fs.statSync(fullpath)
      if (stat.isFile()) {
        const update = {
          file,
          path: { ...parsed, fullpath },
          stat,
          type: fnCheckType(parsed.ext)
        }
        if (update.type === 'image') {
          update.dimension = sizeOf(fullpath)
        }
        await db.files.update({ file }, { $set: { ...update } }, { upsert: true })
        fnUpdateMetaData(update)
      }
    }
  } catch (error) {
    logger.error(`Init files Error: ${error}`)
  }
}

export { HomePath, MediaPath, FilesPath, fnInitFolders, fnInitFiles }
