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
    <Logo v-if="setup.view === 'logo'" />
    <Video v-show="setup.view === 'video'" />
    <Photo v-show="setup.view === 'photo'" />
    <audio ref="ap" controls />
  </q-page>
</template>

<style scoped></style>
