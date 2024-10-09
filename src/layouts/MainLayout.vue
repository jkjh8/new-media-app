<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { useFilesStore } from 'src/stores/files'
import { useSetupStore } from 'src/stores/setup'
import { storeToRefs } from 'pinia'
// composables
import { useSetup } from 'src/composables/useSetup'
import { usePlayer } from 'src/composables/usePlayer'

const $q = useQuasar()
const { setup } = storeToRefs(useSetupStore())
const { fnInitPlayerFuntions } = usePlayer()
const { fnInitSetupFuntions, fnCheckTheme } = useSetup()

onMounted(() => {
  fnInitPlayerFuntions()
  fnInitSetupFuntions()
  API.receive('files', (data) => {
    useFilesStore().fnUpdateFiles(data)
  })
  useSetupStore().fnGetAudioDevices()
})

onBeforeMount(async () => {
  useSetupStore().fnUpdateSetup(await API.invoke('getSetup'))
  fnCheckTheme()
})
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
