<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { useFilesStore } from 'src/stores/files'
import { useSetupStore } from 'src/stores/setup'
import { storeToRefs } from 'pinia'

const $q = useQuasar()
const { setup } = storeToRefs(useSetupStore())

onMounted(() => {
  API.receive('files', (data) => {
    useFilesStore().fnUpdateFiles(data)
  })
  useSetupStore().fnGetAudioDevices()
})

onBeforeMount(async () => {
  useSetupStore().fnUpdateSetup(await API.invoke('getSetup'))
  $q.dark.set(setup.value.mode === 'dark' ? true : false)
})
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
