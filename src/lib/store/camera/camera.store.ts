import { create } from 'zustand'

import { CameraState } from './camera.state'

export const useCameraStore = create<CameraState>()((set) => ({
  cameraList: [],
  avalableResolutions: [
    {
      name: 'HD',
      width: 1280,
      height: 720,
    },
    {
      name: 'Full HD',
      width: 1920,
      height: 1080,
    },
    {
      name: '2K',
      width: 2048,
      height: 1080,
    },
    {
      name: '4K',
      width: 3840,
      height: 2160,
    },
  ],

  isAccessingCamera: true,
  isCameraPermissionDenied: false,
  isCameraPermissionGranted: false,
  isCameraPaused: false,

  finishAccessingCamera(granted) {
    set(() => ({
      isAccessingCamera: false,
      isCameraPermissionGranted: granted,
      isCameraPermissionDenied: !granted,
    }))
  },

  setCameraVisibility(visible) {
    set(() => {
      return {
        isCameraPaused: visible,
      }
    })
  },

  setCameraList(cameraList) {
    console.log('setCameraList:', cameraList)

    set(() => ({
      cameraList,
    }))
  },

  setSelectedCamera(camera) {
    set(() => ({
      selectedCamera: camera,
    }))
  },

  setSelectedCameraSettings(settings) {
    set(() => {
      return {
        selectedCameraSettings: settings,
      }
    })
  },
}))
