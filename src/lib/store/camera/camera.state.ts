export interface CameraState {
  isCameraPaused: boolean
  isCameraPermissionDenied: boolean

  setCameraVisibility(visible: boolean): void
  setCameraPermission(granted: boolean): void
}
