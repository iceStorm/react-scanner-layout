export async function getCameraList() {
  const allDevices = await navigator.mediaDevices.enumerateDevices()
  return allDevices.filter((d) => d.kind === 'videoinput')
}

export async function checkCameraPermission() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: {
        ideal: 3840,
      },
      height: {
        ideal: 2160,
      },
    },
  })
  const streamSettings = getStreamSettings(stream)

  stream.getVideoTracks().forEach((track) => track.stop())

  return streamSettings
}

// DOMException: Requested device not found

export function getStreamSettings(stream: MediaStream) {
  return stream.getVideoTracks()[0].getSettings()
}
