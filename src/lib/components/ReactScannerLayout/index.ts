export * from './ReactScannerLayout'

import { mountStoreDevtool } from 'simple-zustand-devtools'

import { useCameraStore } from '~store/camera'
import { useMenuStore } from '~store/menu'
import { useConfigStore } from '~store/config'

import { log } from '~utils/logger.utils'

console.log('Vite mode:', import.meta.env.MODE)

if (import.meta.env.MODE === 'development') {
  log('Start Zustand Debugging...')

  mountStoreDevtool('camera-store', useCameraStore)
  mountStoreDevtool('menu-store', useMenuStore)
  mountStoreDevtool('config-store', useConfigStore)
}
