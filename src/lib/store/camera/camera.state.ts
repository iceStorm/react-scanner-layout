export interface CameraState {
  isAccessingCamera: boolean
  isCameraPaused: boolean
  isCameraPermissionDenied: boolean
  isCameraNotFound: boolean

  selectedCamera?: MediaDeviceInfo
  selectedCameraSettings?: CameraSettings
  cameraList: MediaDeviceInfo[]

  avalableResolutions: CameraResolution[]
  supportedBarcodeFormats: string[]

  setCameraList(cameraList: MediaDeviceInfo[]): void
  setCameraVisibility(visible: boolean): void
  setSelectedCamera(camera?: MediaDeviceInfo): void
  setSelectedCameraSettings(settings: CameraSettings): void

  finishAccessingCamera(granted: boolean | null | undefined): void
  addResolution(res: CameraResolution): void
  toggleSupportedBarcodeFormat(format: string): void
}

export type CameraResolution = {
  name: string
  width: number
  height: number
}

export type CameraSettings = MediaTrackSettings & {
  mirrored?: boolean
}
