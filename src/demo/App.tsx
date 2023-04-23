import { ReactScannerLayout, ReactScannerLayoutRef } from '@components/ReactScannerLayout'
import { useEffect, useRef } from 'react'

function App() {
  const scannerLayoutRef = useRef<ReactScannerLayoutRef>(null)

  useEffect(() => {
    if (scannerLayoutRef.current) {
      // scannerLayoutRef.current.addMenuItem({
      //   //
      // })
    }
  }, [])

  return (
    <>
      <ReactScannerLayout ref={scannerLayoutRef} />
    </>
  )
}

export default App
