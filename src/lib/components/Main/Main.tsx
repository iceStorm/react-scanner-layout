import { useEffect, useRef } from 'react'
import { shallow } from 'zustand/shallow'

import { AnimatePresence, motion } from 'framer-motion'
import Webcam from 'react-webcam'
import { clsx } from 'clsx'

import { useCameraStore } from '@store/camera'
import { useMenuStore } from '@store/menu'

import { getStreamSettings } from '@utils/camera.utils'

export function Main() {
  const [
    isCameraPaused,
    selectedCamera,
    selectedCameraSettings,
    finishAccessingCamera,
    setSelectedCameraSettings,
  ] = useCameraStore(
    (state) => [
      state.isCameraPaused,
      state.selectedCamera,
      state.selectedCameraSettings,
      state.finishAccessingCamera,
      state.setSelectedCameraSettings,
    ],
    shallow,
  )

  const [hideActiveMenuPanel] = useMenuStore((state) => [state.hideActiveMenuPanel])

  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
  }, [])

  function handleWindowResize() {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
  }

  console.log('Main renders...')

  function handleUserMedia(stream: MediaStream) {
    const settings = getStreamSettings(stream)

    console.log('Width: ' + settings.width + 'px')
    console.log('Height: ' + settings.height + 'px')

    setSelectedCameraSettings(settings)

    if (
      selectedCameraSettings?.width &&
      selectedCameraSettings.height &&
      settings.width &&
      settings.height
    ) {
      if (
        settings.width < selectedCameraSettings.width ||
        settings.height < selectedCameraSettings.height
      ) {
        // setSelectedCameraSettings(settings)
      }
    }
  }

  function handleUserMediaError(error: DOMException | string) {
    console.log(error)
    finishAccessingCamera(false)
  }

  return (
    <AnimatePresence>
      {!isCameraPaused && selectedCamera && (
        <motion.main
          transition={{ duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => hideActiveMenuPanel()}
        >
          <canvas ref={canvasRef} className={clsx('absolute inset-0')} />

          <Webcam
            id="video"
            ref={webcamRef}
            className="w-full h-screen object-cover"
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            mirrored={selectedCameraSettings?.mirrored}
            videoConstraints={{
              aspectRatio: 1,
              facingMode: 'environment',
              deviceId: selectedCamera.deviceId,
              width: selectedCameraSettings?.width,
              height: selectedCameraSettings?.height,
            }}
          />
        </motion.main>
      )}
    </AnimatePresence>
  )
}
