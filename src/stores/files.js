import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilesStore = defineStore('files', () => {
  const files = ref([])
  const fnUpdateFiles = (newFiles) => {
    files.value = newFiles
  }
  const fnUpdateFile = (file) => {
    const idx = files.value.findIndex((f) => f._id === file._id)
    if (idx === -1) {
      files.value.push(file)
    } else {
      files.value[idx] = file
    }
  }

  return {
    files,
    fnUpdateFiles,
    fnUpdateFile
  }
})
