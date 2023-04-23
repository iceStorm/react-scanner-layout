import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { ConditionalPick } from 'type-fest'

import { RiBarcodeLine } from 'react-icons/ri'
import { IoMusicalNote, IoVideocam } from 'react-icons/io5'
import { CiBarcode } from 'react-icons/ci'

import { useMenuStore, MenuState } from '@store/menu'
import { MenuBarcodesPanel } from '@menu-items/MenuBarcodes'

import '../styles.scss'
import { Menu } from './Menu'
import { Main } from './Main'
import clsx from 'clsx'

export interface ReactScannerLayoutMenu {
  title: React.ReactNode
}

// extracting only functions from the menu
export type ReactScannerLayoutRef = ConditionalPick<MenuState, (param: never) => void>

export interface ReactScannerLayoutProps {
  ref: ReactScannerLayoutRef
}

export const ReactScannerLayout = forwardRef<ReactScannerLayoutRef, ReactScannerLayoutProps>(
  function ReactScannerLayout(_props, ref) {
    const { addMenuItem, removeMenuItemAt, setMenuVisibility, setPosition, setActiveItem } =
      useMenuStore()

    // handle ref impelmentations here
    useImperativeHandle(ref, () => ({
      addMenuItem,
      removeMenuItemAt,
      setMenuVisibility,
      setPosition,
      setActiveItem,
    }))

    useEffect(() => {
      addDefaultMenuItems()
    }, [])

    function addDefaultMenuItems() {
      addMenuItem({
        key: 'barcodes',
        title: 'Barcodes',
        icon: <RiBarcodeLine size={20} />,
        settingsPanel: <MenuBarcodesPanel />,
      })

      addMenuItem({
        key: 'camera',
        title: 'Camera',
        icon: <IoVideocam size={20} />,
        settingsPanel: <MenuBarcodesPanel />,
      })

      addMenuItem({
        key: 'masks',
        title: 'Masks',
        icon: <CiBarcode size={20} />,
        settingsPanel: <MenuBarcodesPanel />,
      })

      addMenuItem({
        key: 'sounds',
        title: (
          <p className="text-xs">
            Sound <br /> Effects
          </p>
        ),
        icon: <IoMusicalNote size={20} />,
        toggleActiveOnClick: true,
        onClick() {
          console.log('item clicked')
        },
      })
    }

    return (
      <div id="react-scanner-layout">
        <div className={clsx('fixed top-0 right-0 bottom-0 left-0', 'bg-black')}>
          <Menu />
          <Main />
        </div>
      </div>
    )
  },
)
