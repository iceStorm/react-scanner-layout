import { useEffect } from 'react'
import clsx from 'clsx'

import { useCameraStore } from '@store/camera'

import BarcodeFormat from 'src/lib/models/BarcodeFormat'

import styles from './MenuBarcodes.module.scss'

const barcodeTypes = Object.values(BarcodeFormat).filter(
  (value) => typeof value === 'string',
) as string[]

export function MenuBarcodesPanel() {
  const supportedBarcodeFormats = useCameraStore((state) => state.supportedBarcodeFormats)

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
              className={clsx(
                'border border-stone-700 rounded-md',
                'px-5 py-2 text-ellipsis line-clamp-1',
                'hover:bg-stone-800',
                {
                  'bg-stone-700': supportedBarcodeFormats.includes(type),
                },
              )}
            >
              {type}
            </button>
          )
        })}
      </section>
    </div>
  )
}
