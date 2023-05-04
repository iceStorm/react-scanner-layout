import { useEffect } from 'react'
import clsx from 'clsx'

import { useCameraStore } from '~store/camera'

import BarcodeFormat from '~models/BarcodeFormat'

import styles from './MenuBarcodes.module.scss'

const barcodeTypes = Object.values(BarcodeFormat).filter(
  (value) => typeof value === 'string',
) as string[]

export function MenuBarcodesPanel() {
  const [supportedBarcodeFormats, addSupportedBarcodeFormat] = useCameraStore((state) => [
    state.supportedBarcodeFormats,
    state.toggleSupportedBarcodeFormat,
  ])

  useEffect(() => {
    console.log('barcodeTypes:', barcodeTypes)
  }, [])

  return (
    <div>
      <section className={styles.barcodeGrid}>
        {barcodeTypes.map((type) => {
          return (
            <button
              key={type}
              className={clsx('btn-toggle', {
                active: supportedBarcodeFormats.includes(type),
              })}
              onClick={() => addSupportedBarcodeFormat(type)}
            >
              {type}
            </button>
          )
        })}
      </section>
    </div>
  )
}
