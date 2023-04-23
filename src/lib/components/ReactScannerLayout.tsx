import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { ConditionalPick } from 'type-fest'

import { useMenuStore, MenuState } from '@store/menu'

import '../styles.scss'
import { Header } from './Header'
import { Main } from './Main'

export interface ReactScannerLayoutMenu {
  title: React.ReactNode
}

// extracting only functions from the menu
export type ReactScannerLayoutRef = ConditionalPick<MenuState, (param: never) => void>

export interface ReactScannerLayoutProps {
  ref: ReactScannerLayoutRef
}

export const ReactScannerLayout = forwardRef<ReactScannerLayoutRef, ReactScannerLayoutProps>(
  function ReactScannerLayout(props, ref) {
    const { addMenuItem, removeMenuItemAt, setMenuVisibility } = useMenuStore()

    // handle ref impelmentations here
    useImperativeHandle(ref, () => ({
      addMenuItem,
      removeMenuItemAt,
      setMenuVisibility,
    }))

    useEffect(() => {
      //
    }, [])

    return (
      <div id="react-scanner-layout">
        <div className="h-screen w-screen">
          <Header />
          <Main />
        </div>
      </div>
    )
  },
)
