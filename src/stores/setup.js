import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAudioStore } from './audio'
import { useVideoStore } from './video'
import { storeToRefs } from 'pinia'

export const useSetupStore = defineStore('setup', () => {
  const setup = ref({})
  const { ap } = storeToRefs(useAudioStore())
  const { vp } = storeToRefs(useVideoStore())

  const fnUpdateSetup = (value) => {
    for (const key in value) {
      setup.value[key] = value[key]
    }
  }

  const fnGetAudioDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    setup.value.audioDevices = devices.filter((device) => device.kind === 'audiooutput')
    API.send('audioDevices', JSON.stringify(setup.value.audioDevices))
  }

  const fnSetAudioDevice = (deviceId) => {
    if (deviceId && ap.value?.sinkId !== deviceId) {
      ap.value.setSinkId(deviceId)
      console.log('audio device set to', deviceId)
    }
    if (deviceId && vp.value?.sinkId !== deviceId) {
      vp.value.setSinkId(deviceId)
      console.log('video device set to', deviceId)
    }
  }

  return {
    setup,
    fnUpdateSetup,
    fnGetAudioDevices,
    fnSetAudioDevice
  }
})
