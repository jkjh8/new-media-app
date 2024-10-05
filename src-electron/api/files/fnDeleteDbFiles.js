import db from 'src-electron/db'

export const fnDeleteDbFiles = async (files) => {
  const dbFiles = await db.files.find()
  const fileSet = new Set(files)
  for (const dbFile of dbFiles) {
    if (!fileSet.has(dbFile.file)) {
      await db.files.remove({ file: dbFile.file })
    }
  }
}
