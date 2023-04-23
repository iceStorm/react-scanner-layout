export async function getCameraList() {
  const allDevices = await navigator.mediaDevices.enumerateDevices()
  return allDevices.filter((d) => d.kind === 'videoinput')
}

/**
 * @deprecated unstable method.
 */
export async function haveCameraPermission() {
  const allDevices = await getCameraList()
  return allDevices.every((d) => d.kind === 'videoinput' && d.label)
}

export async function checkCameraPermission() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  stream.getVideoTracks().forEach((track) => track.stop())
  return true
}

// DOMException: Requested device not found
