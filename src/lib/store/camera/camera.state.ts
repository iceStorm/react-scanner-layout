export interface CameraState {
  isAccessingCamera: boolean
  isCameraPaused: boolean
  isCameraPermissionDenied: boolean
  isCameraPermissionGranted: boolean

  setCameraVisibility(visible: boolean): void
  finishAccessingCamera(granted: boolean): void
}
