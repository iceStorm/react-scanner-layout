import { useEffect, useRef } from 'react'

import { ReactScannerLayout, ReactScannerLayoutRef } from '@components/ReactScannerLayout'

function App() {
  const scannerLayoutRef = useRef<ReactScannerLayoutRef>(null)

  useEffect(() => {
    if (scannerLayoutRef.current) {
      // scannerLayoutRef.current.setPosition('bottom')
      // scannerLayoutRef.current.removeMenuItemAt(0)
    }
  }, [])

  return (
    <>
      <ReactScannerLayout ref={scannerLayoutRef} />
    </>
  )
}

export default App
