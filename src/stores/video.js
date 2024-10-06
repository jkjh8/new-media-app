import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoStore = defineStore('video', () => {
  const vp = ref(null)

  return {
    vp
  }
})
