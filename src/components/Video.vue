<script setup>
import { onMounted } from 'vue'
import { useVideoStore } from 'src/stores/video'
import { useSetupStore } from 'src/stores/setup'
import { storeToRefs } from 'pinia'

const { vp } = storeToRefs(useVideoStore())
const { setup } = storeToRefs(useSetupStore())

onMounted(() => {
  if (setup.value.audioDevice && vp.value.sinkId !== setup.value.audioDevice) {
    vp.value.setSinkId(setup.value.audioDevice)
    console.log('Audio device set to', setup.value.audioDevice)
  }
  vp.value.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  // vp.value.play()
})
</script>

<template>
  <video class="fw" ref="vp" controls />
</template>

<style scoped></style>
