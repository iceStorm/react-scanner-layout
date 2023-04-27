import { merge } from 'lodash'
import { log } from './logger.utils'

export async function getCameraList() {
  const allDevices = await navigator.mediaDevices.enumerateDevices()
  return allDevices.filter((d) => d.kind === 'videoinput')
}

export async function getCameraStream(constraints?: MediaStreamConstraints) {
  const defaultConstraints: MediaStreamConstraints = {
    video: {
      // try to get 4K resolution when camera first starts
      width: {
        ideal: 4096,
      },
      height: {
        ideal: 2160,
      },
    },
  }

  const finalConstraints = merge(defaultConstraints, constraints)
  log('[camera.utils.getCameraStream] Start requesting camera with constraints:', finalConstraints)

  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints()
  log('[camera.utils.getCameraStream.supportedConstraints]', supportedConstraints)

  const stream = await navigator.mediaDevices.getUserMedia(finalConstraints)
  const streamSettings = stream.getVideoTracks()[0].getSettings()

  log(
    '[camera.utils.getCameraStream] Stream tracks:',
    stream.getTracks().map((t) => [t.id, t.label, t.kind]),
  )

  return { stream, streamSettings }
}
