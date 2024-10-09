import defaultValue from 'src-electron/default'
import db from 'src-electron/db'

const fnInitDefault = async () => {
  try {
    const docs = await db.setup.find()
    if (docs.length) {
      for (const doc of docs) {
        defaultValue[doc.key] = doc.value
      }
    }
    console.log(defaultValue)
    console.log('Init default setup')
  } catch (error) {
    console.error(`Init default Error: ${error}`)
  }
}

export { fnInitDefault }
