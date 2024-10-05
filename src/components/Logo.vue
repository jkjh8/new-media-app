<script setup>
import { ref, onMounted } from 'vue'
import { useFilesStore } from 'src/stores/files'

const get = async () => {
  const r = await API.invoke('getFiles')
  useFilesStore().fnUpdateFiles(r)
}
onMounted(() => {
  console.log('Logo component mounted')
  API.receive('info', (data) => {
    console.log(data)
    files.value = data
  })
})
</script>

<template>
  <div class="text-h6">Logo</div>
  <div>{{ useFilesStore().files }}</div>
  <q-btn label="get" @click="get"> </q-btn>
</template>

<style scoped></style>
