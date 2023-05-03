import { ScreenShotProps } from '@models/ScreenShot'

function _captureImageFromVideoFactory() {
  const canvas = document.createElement('canvas')
  let context: CanvasRenderingContext2D | null

  return (videoElement: HTMLVideoElement, _props?: ScreenShotProps) => {
    function capture(type: 'ImageData'): ImageData
    function capture(type: 'base64'): string
    function capture(type: 'ImageData' | 'base64') {
      if (!context) {
        context = canvas.getContext('2d', { willReadFrequently: true })
      }

      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight

      context?.clearRect(0, 0, canvas.width, canvas.height)
      context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

      switch (type) {
        case 'ImageData': {
          return context?.getImageData(0, 0, canvas.width, canvas.height)
        }

        case 'base64': {
          return canvas.toDataURL()
        }
      }
    }

    return {
      toImageData() {
        return capture('ImageData')
      },

      toBase64() {
        return capture('base64')
      },
    }
  }
}

export const captureImageFromVideo = _captureImageFromVideoFactory()
