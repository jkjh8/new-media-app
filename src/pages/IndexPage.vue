<script setup>
import { onMounted } from 'vue'
import { useSetupStore } from 'src/stores/setup'
import { useAudioStore } from 'src/stores/audio'
import { useVideoStore } from 'src/stores/video'
import { storeToRefs } from 'pinia'
import { useCallback } from 'src/composables/useCallback'

import Video from 'src/components/Video.vue'
import Photo from 'src/components/Photo.vue'
import Logo from 'src/components/Logo.vue'

const { setup } = storeToRefs(useSetupStore())
const { ap } = storeToRefs(useAudioStore())
const { vp } = storeToRefs(useVideoStore())
const { fnSetCallback } = useCallback()

onMounted(() => {
  fnSetCallback(ap.value, 'audio')
  fnSetCallback(vp.value, 'video')
  useSetupStore().fnGetAudioDevices()
  useSetupStore().fnSetAudioDevice(setup.value.audioDevice)
})
</script>
<template>
  <q-page>
    <Logo v-if="setup.mode === 'logo'" />
    <Video v-show="setup.mode === 'video'" />
    <Photo v-show="setup.mode === 'photo'" />
    <audio ref="ap" />
  </q-page>
</template>

<style scoped></style>
