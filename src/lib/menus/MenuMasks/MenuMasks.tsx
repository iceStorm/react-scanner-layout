import clsx from 'clsx'

import { IoScan } from 'react-icons/io5'
import { AiOutlineScan } from 'react-icons/ai'
import { CiBarcode } from 'react-icons/ci'

import { MenuItem } from '~store/menu'

import styles from './MenuMasks.module.scss'

export function MenuMasksPanel() {
  return (
    <div>
      <section>
        <p className="mb-3">Select a mask to visualize your UI with a focus frame.</p>

        <div className={clsx(styles.maskGrid, 'text-white')}>
          <button className="rsl-btn-toggle !py-5">
            <AiOutlineScan size={30} className="mx-auto" />
          </button>

          <button className="rsl-btn-toggle !py-5">
            <IoScan size={30} className="mx-auto" />
          </button>
        </div>
      </section>
    </div>
  )
}

export const MenuMasks: MenuItem = {
  key: 'masks',
  title: 'Masks',
  icon: <CiBarcode size={20} />,
  settingsPanel: <MenuMasksPanel />,
}
