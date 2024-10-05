<script setup>
import { ref, onMounted } from 'vue'
import { useFilesStore } from 'src/stores/files'

onMounted(() => {
  API.receive('files', (data) => {
    useFilesStore().fnUpdateFiles(data)
  })
})
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
