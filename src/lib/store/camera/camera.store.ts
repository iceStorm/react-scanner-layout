import { create } from 'zustand'

import { CameraState } from './camera.state'

export const useCameraStore = create<CameraState>()((set) => ({
  isCameraPaused: false,
  isCameraPermissionDenied: false,

  setCameraVisibility(visible) {
    return set(() => ({
      isCameraPaused: visible,
    }))
  },

  setCameraPermission(granted) {
    return set(() => ({
      isCameraPermissionDenied: granted,
    }))
  },
}))
