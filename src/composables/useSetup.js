import { useQuasar } from 'quasar'
import { useSetupStore } from 'src/stores/setup'
import { useVideoStore } from 'src/stores/video'
import { useAudioStore } from 'src/stores/audio'
import { storeToRefs } from 'pinia'
export const useSetup = () => {
  const { setup } = storeToRefs(useSetupStore())
  const { vp } = storeToRefs(useVideoStore())
  const { ap } = storeToRefs(useAudioStore())
  const $q = useQuasar()

  const fnCheckTheme = () => {
    $q.dark.set(setup.value.theme === 'dark' ? true : false)
  }

  const fnInitSetupFuntions = () => {
    API.receive('setup', (data) => {
      console.log(data)

      switch (data.command) {
        case 'theme':
          setup.value.theme = data.value
          fnCheckTheme()
          break
        case 'view':
          setup.value.view = data.value
          break
        case 'fullscreen':
          setup.value.fullscreen = data.value
          break
        default:
          break
      }
    })
    console.log('init setup functions')
  }
  return { fnCheckTheme, fnInitSetupFuntions }
}
