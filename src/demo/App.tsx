import { useEffect, useRef, useState } from 'react'

import { scanImageData } from '@undecaf/zbar-wasm'
import toast from 'react-simple-toasts'

import { ReactScannerLayout, ReactScannerLayoutRef } from '@components/ReactScannerLayout'

import { imageDataToObjectUrl } from '@utils/image.utils'
import { log } from '@utils/logger.utils'

function App() {
  const scannerLayoutRef = useRef<ReactScannerLayoutRef>(null)

  const [screenshotData, setScreenshotData] = useState<ImageData>()

  useEffect(() => {
    setInterval(() => {
      captureImageAndDetectBarcodes()
    }, 2000)
  }, [])

  async function captureImageAndDetectBarcodes() {
    if (scannerLayoutRef.current) {
      const screenShot = scannerLayoutRef.current.captureScreenShot().toImageData()
      setScreenshotData(screenShot)
      console.log('screenshot:', screenShot)

      if (screenShot) {
        const symbols = await scanImageData(screenShot)

        if (symbols.length) {
          const barcodes = symbols.map((s) => {
            log('[ZBar detected]', s?.typeName, s?.decode())

            return (
              <p>
                [{s.typeName}] {s.decode()}
              </p>
            )
          })

          toast(<div style={{ display: 'flex', flexDirection: 'column' }}>{barcodes}</div>)
        }
      }
    }
  }

  return (
    <>
      <ReactScannerLayout ref={scannerLayoutRef} />

      {screenshotData && (
        <img
          src={imageDataToObjectUrl(screenshotData)}
          alt="screen_shot"
          style={{ zIndex: 99 }}
          // width={screenshotData.width}
          // height={screenshotData.height}
        />
      )}
    </>
  )
}

export default App
