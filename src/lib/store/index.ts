import { create } from 'zustand'

import { CameraState, HeaderState } from './store.state'

export const useHeaderStore = create<HeaderState>()((set) => ({
  isMenuHidden: false,

  setMenuVisibility(visible) {
    return set(() => ({
      isMenuHidden: visible,
    }))
  },
}))

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
