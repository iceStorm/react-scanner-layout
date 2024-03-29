# html5-scanner-layout

### Scanning barcodes, QR codes on the web?
##### Looking for a professional layout which contains camera picker that adapts smoothly between devices, a barcode type picker, or other controls?

## Live demo: https://react-scanner-layout.vercel.app/

## Install:
```bash
npm i react-scanner-layout
```

```bash
yarn add react-scanner-layout
```

## Acknowledge: This library only provide a layout with some builtin functions like: Camera picker, displaying webcam content, playing sounds...
To be able to scan barcodes, please find yourself a library to integrate with this lib, such as:
- [zbar-wasm](https://github.com/undecaf/zbar-wasm)
- [zxing-js](https://github.com/zxing-js/library)
- [dannadori-wasm](https://www.npmjs.com/package/@dannadori/barcode-scanner-worker-js)

## Example:
```typescript
import { useEffect, useRef, useState } from 'react'

import { scanImageData } from '@undecaf/zbar-wasm'
import toast from 'react-simple-toasts'

import { IoMusicalNote } from 'react-icons/io5'

import { ReactScannerLayout, ReactScannerLayoutRef } from 'react-scanner-layout'
import { MenuCamera, MenuBarcodes, MenuMasks } from 'react-scanner-layout/menu'
import 'react-scanner-layout/style.css'

import { log } from '~utils/logger.utils'

import pip from '~assets/store-scanner-beep.mp3'
const pipAudio = new Audio(pip)

import styles from './App.module.scss'

function App() {
  const scannerLayoutRef = useRef<ReactScannerLayoutRef>(null)
  const [useSoundEffects, setUseSoundEffects] = useState(false)

  useEffect(() => {
    addDefaultMenuItems()

    setInterval(() => {
      captureImageAndDetectBarcodes()
    }, 2000)
  }, [])

  function addDefaultMenuItems() {
    scannerLayoutRef.current?.addMenuItem(MenuBarcodes)
    scannerLayoutRef.current?.addMenuItem(MenuCamera)
    scannerLayoutRef.current?.addMenuItem(MenuMasks)
    scannerLayoutRef.current?.addMenuItem({
      key: 'sounds',
      title: (
        <p className="">
          Sound <br /> Effects
        </p>
      ),
      icon: <IoMusicalNote size={20} />,
      toggleActiveOnClick: true,
      onClick() {
        setUseSoundEffects(!useSoundEffects)
      },
    })
  }

  async function captureImageAndDetectBarcodes() {
    if (scannerLayoutRef.current) {
      const screenShot = scannerLayoutRef.current.captureScreenShot().toImageData()
      // console.log('screenshot:', screenShot)

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

          if (useSoundEffects) {
            pipAudio.play()
          }
        }
      }
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>0</h1>
        <p>parcels scanned successfully</p>
      </header>

      <main className={styles.main}>
        <ReactScannerLayout ref={scannerLayoutRef} />
      </main>

      <footer className={styles.footer}>
        <button className={styles.button}>Enter barcode manually</button>
      </footer>
    </div>
  )
}

export default App
```
