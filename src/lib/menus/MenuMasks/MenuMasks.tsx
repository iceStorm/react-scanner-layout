import clsx from 'clsx'

import { IoScan } from 'react-icons/io5'
import { AiOutlineScan } from 'react-icons/ai'

import styles from './MenuMasks.module.scss'

export function MenuMasksPanel() {
  return (
    <div>
      <section>
        <h2 className="mb-3">Select a mask to visualize your UI with a focus frame.</h2>

        <div className={clsx(styles.maskGrid, 'text-white')}>
          <button className="btn-toggle !py-5">
            <AiOutlineScan size={30} className="mx-auto" />
          </button>

          <button className="btn-toggle !py-5">
            <IoScan size={30} className="mx-auto" />
          </button>
        </div>
      </section>
    </div>
  )
}
