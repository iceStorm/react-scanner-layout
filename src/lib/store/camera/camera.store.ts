import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createJSONStorage, persist } from 'zustand/middleware'

import { getCameraList, getCameraStream } from '~utils/camera.utils'
import { log } from '~utils/logger.utils'
import { sleep } from '~utils/async.utils'

import { CameraState } from './camera.state'

export const useCameraStore = create(
  persist(
    immer<CameraState>((set, get) => ({
      cameraList: [],
      avalableResolutions: [
        {
          name: 'Test',
          width: 500,
          height: 500,
        },
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
          width: 4096,
          height: 2160,
        },
      ],

      selectedCamera: {},
      supportedBarcodeFormats: ['CODE_128', 'QR_CODE'],

      isAccessingCamera: true,
      isCameraPermissionDenied: false,
      isCameraPaused: false,
      isCameraNotFound: false,
      isCameraCouldNotStart: false,

      async requestCamera(constraints) {
        // stop current stream first
        if (
          get().selectedCamera?.stream &&
          typeof get().selectedCamera?.stream?.getTracks === 'function'
        ) {
          get()
            .selectedCamera?.stream?.getTracks()
            .forEach((track) => {
              track.stop()
              get().selectedCamera?.stream?.removeTrack(track)
            })

          await sleep(2000)
        }

        try {
          const currentCamera = get().selectedCamera
          const currentCameraProps: MediaTrackConstraints = {
            width: currentCamera?.width,
            height: currentCamera?.height,
            deviceId: currentCamera?.deviceId,
          }

          const baseConstraints: MediaStreamConstraints = {
            video: {
              ...currentCameraProps,
              ...(constraints?.video as MediaTrackConstraints),
            },
          }

          log('[requestCameraPermission] Initial constraints:', baseConstraints)
          const { stream, streamSettings } = await getCameraStream(baseConstraints)
          const cameraList = await getCameraList()

          log('[requestCameraPermission] Camera settings:', stream, streamSettings)

          get().setCameraList(cameraList)
          get().setSelectedCameraSettings(streamSettings)

          get().setSelectedCameraSettings({
            ...cameraList.find((camera) => camera.deviceId === streamSettings.deviceId),
          })

          get().addResolution({
            name: 'Default',
            width: streamSettings.width || 0,
            height: streamSettings.height || 0,
          })

          get().finishAccessingCamera('granted', stream)
        } catch (error: any) {
          console.error('[camera.store.requestCameraPermission] Exception:', error)

          if (error instanceof Error) {
            switch (error.message) {
              case 'Requested device not found':
                get().finishAccessingCamera('camera_not_found')
                break

              case 'Permission denied':
                get().finishAccessingCamera('permission_denied')
                break

              case 'Could not start video source':
                get().finishAccessingCamera('could_not_start')
                break

              default:
                get().finishAccessingCamera('unknown_error')
            }

            return
          }

          get().finishAccessingCamera('unknown_error')
        }
      },

      finishAccessingCamera(status, stream) {
        set((state) => {
          if (state.selectedCamera) {
            state.selectedCamera.stream = stream
          }

          state.isAccessingCamera = false
          state.isCameraNotFound = status === 'camera_not_found'
          state.isCameraCouldNotStart = status === 'could_not_start'
          state.isCameraPermissionDenied = status === 'permission_denied'
        })
      },

      toggleCameraVisibility(visibility) {
        set((state) => {
          // stop current camera stream
          if (!state.isCameraPaused && state.selectedCamera?.stream) {
            log(
              '[camera.store.toggleCameraVisibility]',
              state.isCameraPaused ? 'Resuming camera' : 'Pausing camera',
            )

            state.selectedCamera.stream.getTracks().forEach(function (track) {
              track.stop()
              state.selectedCamera?.stream?.removeTrack(track)
            })

            state.selectedCamera.stream = undefined
          } else {
            get().requestCamera()
          }

          state.isCameraPaused = visibility || !state.isCameraPaused
        })
      },

      setCameraList(cameraList) {
        log('[camera.store.setCameraList]', cameraList)

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
          if (state.selectedCamera) {
            state.selectedCamera.width = width
            state.selectedCamera.height = height
          }
        })
      },

      setSelectedCameraSettings(settings) {
        set((state) => {
          state.selectedCamera = {
            ...state.selectedCamera,
            ...settings,
          }
        })
      },

      addResolution(res) {
        set((state) => {
          log('[camera.store.addResolution]', res)

          const oldIndex = state.avalableResolutions.findIndex((r) => r.name === res.name)

          if (oldIndex !== -1) {
            state.avalableResolutions.splice(oldIndex, 1, res)
          } else {
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
      name: 'rsl-camera-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        supportedBarcodeFormats: state.supportedBarcodeFormats,
        selectedCamera: {
          mirrored: state.selectedCamera?.mirrored,
          // devideId: state.selectedCamera?.deviceId,
        },
      }),
    },
  ),
)
