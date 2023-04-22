export interface HeaderState {
  isMenuHidden: boolean

  setMenuVisibility(visible: boolean): void
}

export interface CameraState {
  isCameraPaused: boolean
  isCameraPermissionDenied: boolean

  setCameraVisibility(visible: boolean): void
  setCameraPermission(granted: boolean): void
}
