import express from 'express'
import logger from 'src-electron/logger'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`web listening at http://localhost:${port}`)
})
