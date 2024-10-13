import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const ap = ref(null)
  const aps = ref(new Array(32).fill(null))

  return {
    aps,
    ap
  }
})
