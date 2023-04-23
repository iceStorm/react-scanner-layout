import { useEffect, useLayoutEffect, useRef } from 'react'

import Webcam from 'react-webcam'
import { clsx } from 'clsx'

import { useCameraStore } from '@store/camera'

export function Main() {
  const { isCameraPaused } = useCameraStore()

  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useLayoutEffect(() => {
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

  function handleUserMediaError(error: DOMException | string) {
    console.log(error)
  }

  return (
    <main className={clsx('w-screen h-screen')}>
      {!isCameraPaused && (
        <>
          <canvas ref={canvasRef} className={clsx('absolute top-0 right-0 bottom-0 left-0')} />

          <Webcam
            id="video"
            ref={webcamRef}
            className="w-full h-screen object-cover"
            screenshotFormat="image/jpeg"
            onUserMediaError={handleUserMediaError}
            videoConstraints={{ aspectRatio: 1, facingMode: 'environment' }}
          />
        </>
      )}
    </main>
  )
}
