import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const ap = ref(null)

  return {
    ap
  }
})
