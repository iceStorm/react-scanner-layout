import { create } from 'zustand'

import { CameraState } from './camera.state'

export const useCameraStore = create<CameraState>()((set) => ({
  isAccessingCamera: true,
  isCameraPermissionDenied: false,
  isCameraPermissionGranted: false,
  isCameraPaused: false,

  finishAccessingCamera(granted) {
    return set(() => ({
      isAccessingCamera: false,
      isCameraPermissionGranted: granted,
      isCameraPermissionDenied: !granted,
    }))
  },

  setCameraVisibility(visible) {
    return set(() => ({
      isCameraPaused: visible,
    }))
  },
}))
