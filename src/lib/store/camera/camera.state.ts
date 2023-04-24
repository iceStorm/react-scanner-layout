export type CameraResolution = {
  name: string
  width: number
  height: number
}

export type CameraSettings = MediaTrackSettings & {
  mirrored?: boolean
}

export interface CameraState {
  isAccessingCamera: boolean
  isCameraPaused: boolean
  isCameraPermissionDenied: boolean
  isCameraPermissionGranted: boolean

  selectedCamera?: MediaDeviceInfo
  selectedCameraSettings?: CameraSettings
  cameraList: MediaDeviceInfo[]

  avalableResolutions: CameraResolution[]

  setCameraList(cameraList: MediaDeviceInfo[]): void
  setCameraVisibility(visible: boolean): void
  setSelectedCamera(camera?: MediaDeviceInfo): void
  setSelectedCameraSettings(settings: CameraSettings): void

  finishAccessingCamera(granted: boolean): void
  addResolution(res: CameraResolution): void
}
