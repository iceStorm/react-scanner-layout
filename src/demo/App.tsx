// import { useEffect, useRef } from 'react'

// import { scanImageData } from '@undecaf/zbar-wasm'
// import toast from 'react-simple-toasts'

// import { CiBarcode } from 'react-icons/ci'
// import { RiBarcodeLine } from 'react-icons/ri'
// import { IoMusicalNote, IoVideocam } from 'react-icons/io5'

// // import { ReactScannerLayout, ReactScannerLayoutRef } from 'react-scanner-layout'

// import { log } from '@utils/logger.utils'

// import { MenuBarcodesPanel } from '@menus/MenuBarcodes'
// import { MenuCamera } from '@menus/MenuCamera'
// import { MenuMasksPanel } from '@menus/MenuMasks'

// import pip from '@assets/store-scanner-beep.mp3'
// const pipAudio = new Audio(pip)

function App() {
  // const scannerLayoutRef = useRef<ReactScannerLayoutRef>(null)

  // useEffect(() => {
  //   addDefaultMenuItems()

  //   setInterval(() => {
  //     captureImageAndDetectBarcodes()
  //   }, 2000)
  // }, [])

  // function addDefaultMenuItems() {
  //   scannerLayoutRef.current?.addMenuItem({
  //     key: 'barcodes',
  //     title: 'Barcodes',
  //     icon: <RiBarcodeLine size={20} />,
  //     settingsPanel: <MenuBarcodesPanel />,
  //   })

  //   scannerLayoutRef.current?.addMenuItem({
  //     key: 'camera',
  //     title: 'Camera',
  //     icon: <IoVideocam size={20} />,
  //     settingsPanel: <MenuCamera />,
  //   })

  //   scannerLayoutRef.current?.addMenuItem({
  //     key: 'masks',
  //     title: 'Masks',
  //     icon: <CiBarcode size={20} />,
  //     settingsPanel: <MenuMasksPanel />,
  //   })

  //   scannerLayoutRef.current?.addMenuItem({
  //     key: 'sounds',
  //     title: (
  //       <p className="">
  //         Sound <br /> Effects
  //       </p>
  //     ),
  //     icon: <IoMusicalNote size={20} />,
  //     toggleActiveOnClick: true,
  //     onClick() {
  //       pipAudio.play()
  //     },
  //   })
  // }

  // async function captureImageAndDetectBarcodes() {
  //   if (scannerLayoutRef.current) {
  //     const screenShot = scannerLayoutRef.current.captureScreenShot().toImageData()
  //     console.log('screenshot:', screenShot)
  //     if (screenShot) {
  //       const symbols = await scanImageData(screenShot)
  //       if (symbols.length) {
  //         const barcodes = symbols.map((s) => {
  //           log('[ZBar detected]', s?.typeName, s?.decode())
  //           return (
  //             <p>
  //               [{s.typeName}] {s.decode()}
  //             </p>
  //           )
  //         })
  //         toast(<div style={{ display: 'flex', flexDirection: 'column' }}>{barcodes}</div>)
  //       }
  //     }
  //   }
  // }

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <header>
        <p>0</p>
        <p>parcels scanned successfully</p>
      </header>

      {/* <ReactScannerLayout ref={scannerLayoutRef} /> */}

      <footer>
        <button>Enter barcode manually</button>
      </footer>
    </div>
  )
}

export default App
