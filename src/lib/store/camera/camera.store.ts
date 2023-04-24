import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CameraState } from './camera.state'

export const useCameraStore = create(
  persist(
    immer<CameraState>((set) => ({
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

      supportedBarcodeFormats: ['CODE_128', 'QR_CODE'],

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
        set((state) => {
          state.isCameraPaused = visible
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

      setSelectedCameraResolution(width: number, height: number) {
        set((state) => {
          if (state.selectedCameraSettings) {
            state.selectedCameraSettings.width = width
            state.selectedCameraSettings.height = height
          }
        })
      },

      setSelectedCameraSettings(settings) {
        set((state) => {
          state.selectedCameraSettings = {
            ...state.selectedCameraSettings,
            ...settings,
          }
        })
      },

      addResolution(res) {
        set((state) => {
          console.log('addResolution:', res, state)

          if (!state.avalableResolutions.some((r) => r.name === res.name)) {
            console.log(state.avalableResolutions, res)
            state.avalableResolutions.unshift(res)
          }
        })
      },

      toggleSupportedBarcodeFormat(format) {
        set((state) => {
          const oldIndex = state.supportedBarcodeFormats.findIndex((f) => f === format)
          if (oldIndex !== -1) {
            state.supportedBarcodeFormats.splice(oldIndex, 1)
            return
          }

          state.supportedBarcodeFormats.push(format)
        })
      },
    })),
    {
      name: 'camera-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        supportedBarcodeFormats: state.supportedBarcodeFormats,
        selectedCamera: state.selectedCamera,
        selectedCameraSettings: {
          mirrored: state.selectedCameraSettings?.mirrored,
        },
      }),
    },
  ),
)
