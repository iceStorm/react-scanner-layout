type CameraStatusModule = typeof import('./camera.status')
export type CameraStatusSuccess = Extract<CameraStatusModule[keyof CameraStatusModule], 'granted'>
export type CameraStatusFailure = Exclude<CameraStatusModule[keyof CameraStatusModule], 'granted'>

export type CameraResolution = {
  name: string
  width: number
  height: number
}

export type Camera = Partial<
  MediaDeviceInfo &
    MediaTrackSettings & {
      mirrored: boolean
      stream: MediaStream
    }
>

interface CameraStateProps {
  isAccessingCamera: boolean
  isCameraPaused: boolean
  isCameraPermissionDenied: boolean
  isCameraNotFound: boolean
  isCameraCouldNotStart: boolean

  selectedCamera?: Camera
  cameraList: MediaDeviceInfo[]

  avalableResolutions: CameraResolution[]
  supportedBarcodeFormats: string[]
}

interface CameraStateMethods {
  requestCamera(constraints?: MediaStreamConstraints): Promise<unknown>
  setCameraList(cameraList: MediaDeviceInfo[]): void

  setSelectedCamera(camera?: MediaDeviceInfo): void
  setSelectedCameraSettings(settings: Camera): void

  finishAccessingCamera(status: CameraStatusFailure, stream?: MediaStream): void
  finishAccessingCamera(status: CameraStatusSuccess, stream: MediaStream): void

  addResolution(res: CameraResolution): void

  toggleCameraVisibility(visibility?: boolean): void
  toggleSupportedBarcodeFormat(format: string): void
}

export interface CameraState extends CameraStateProps, CameraStateMethods {}
