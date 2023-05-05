import { useEffect, useRef, useState } from 'react'

import { scanImageData } from '@undecaf/zbar-wasm'
import toast from 'react-simple-toasts'

import { IoMusicalNote } from 'react-icons/io5'

import { ReactScannerLayout, ReactScannerLayoutRef } from '~components/ReactScannerLayout'
import { MenuCamera, MenuBarcodes, MenuMasks } from '~menus/index'
import '~styles/index.scss'

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
        <span>
          Sound <br /> Effects
        </span>
      ),
      icon: <IoMusicalNote size={20} />,
      toggleActiveOnClick: true,
      onClick() {
        setUseSoundEffects(!useSoundEffects)
      },
    })
  }

  async function captureImageAndDetectBarcodes() {
    console.log('useSoundEffects:', useSoundEffects)

    if (scannerLayoutRef.current) {
      const screenShot = scannerLayoutRef.current.captureScreenShot().toImageData()

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
            await pipAudio.play()
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
