import { useSetupStore } from 'src/stores/setup'
import { useVideoStore } from 'src/stores/video'
import { useAudioStore } from 'src/stores/audio'
import { storeToRefs } from 'pinia'

export const usePlayer = () => {
  const { setup } = storeToRefs(useSetupStore())
  const { vp } = storeToRefs(useVideoStore())
  const { ap } = storeToRefs(useAudioStore())

  const fnInitPlayerFuntions = () => {
    API.receive('player', (data) => {
      console.log(data)
      switch (data.command) {
        case 'play':
          console.log('play', setup.value.mode)

          if (setup.value.view === 'video') {
            vp.value.play()
          }
          break
        case 'pause':
          vp.value.pause()
          ap.value.pause()
          break
        case 'stop':
          vp.value.pause()
          vp.value.currentTime = 0
          ap.value.pause()
          ap.value.currentTime = 0
          break
        // case 'volume':
        //   audio.value.ap.value.volume = data.value
        //   break
        // case 'seek':
        //   vp.value.seek(data.value)
        //   break
        default:
          break
      }
    })
    console.log('init player functions')
  }
  return { fnInitPlayerFuntions }
}
