import moment from 'moment'
import path from 'path'
import { app } from 'electron'
import winston from 'winston'
import winstonDayliRotate from 'winston-daily-rotate-file'

const logPath = path.join(app.getPath('userData'), 'logs')

const { combine, timestamp, printf } = winston.format
const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winstonDayliRotate({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logPath,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    }),
    new winstonDayliRotate({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logPath,
      filename: `%DATE%-ERROR.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      )
    })
  )
}

logger.info(`LOG Folder: ${logPath}`)

export default logger
