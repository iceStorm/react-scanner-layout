import { RefObject, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { shallow } from 'zustand/shallow'

import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'

import { useCameraStore } from '@store/camera'
import { useMenuStore } from '@store/menu'

import { log } from '@utils/logger.utils'

export interface MainRef {
  videoRef: RefObject<HTMLVideoElement>
  canvasRef: RefObject<HTMLCanvasElement>
}

export const Main = forwardRef<MainRef>(function (_props, ref) {
  const [isCameraPaused, selectedCamera] = useCameraStore(
    (state) => [state.isCameraPaused, state.selectedCamera, state.finishAccessingCamera],
    shallow,
  )

  const [hideActiveMenuPanel] = useMenuStore((state) => [state.hideActiveMenuPanel], shallow)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useImperativeHandle(ref, () => ({
    videoRef,
    canvasRef,
  }))

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

  useEffect(() => {
    if (videoRef?.current) {
      if (selectedCamera?.stream) {
        videoRef.current.srcObject = selectedCamera.stream
        videoRef.current
          .play()
          .then(() => {
            log(
              '[Main.tsx] videoRef.play() success',
              videoRef.current?.videoWidth,
              videoRef.current?.videoHeight,
            )
          })
          .catch((err) => {
            console.error('[Main.tsx] videoRef.play() exception:', err)
          })
      } else {
        videoRef.current.pause()
      }
    }

    return () => {
      // videoRef.current?.pause()
    }
  }, [selectedCamera?.stream])

  function handleWindowResize() {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
  }

  console.log('Main renders...')

  return (
    <AnimatePresence>
      {!isCameraPaused && selectedCamera && selectedCamera.stream && (
        <motion.main
          transition={{ duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => hideActiveMenuPanel()}
        >
          <canvas ref={canvasRef} className={clsx('absolute inset-0')} />
          <video
            ref={videoRef}
            playsInline
            className={clsx('w-full h-screen object-cover', {
              '-scale-x-100': selectedCamera?.mirrored,
            })}
          >
            <h1>Video stream from Camera not started.</h1>
          </video>
        </motion.main>
      )}
    </AnimatePresence>
  )
})
