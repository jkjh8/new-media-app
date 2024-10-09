<script setup>
import { ref, computed } from 'vue'
import { useSetupStore } from 'src/stores/setup'
import { storeToRefs } from 'pinia'

const { setup } = storeToRefs(useSetupStore())

const logo = computed(
  () => setup.value.logo || (setup.value.theme === 'dark' ? 'harman-logo-bk.svg' : 'harman-logo.svg')
)
</script>

<template>
  <div class="logo-container">
    <q-img class="logo" :src="logo" alt="Logo" />
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
}
.logo {
  max-width: 300px;
}
</style>
