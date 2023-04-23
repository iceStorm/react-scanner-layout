import { forwardRef, useEffect, useImperativeHandle } from 'react'

import clsx from 'clsx'
import { ConditionalPick } from 'type-fest'
import { motion, AnimatePresence } from 'framer-motion'

import { RiBarcodeLine } from 'react-icons/ri'
import { IoMusicalNote, IoVideocam } from 'react-icons/io5'
import { CiBarcode } from 'react-icons/ci'

import { useMenuStore, MenuState } from '@store/menu'
import { useCameraStore } from '@store/camera'

import { checkCameraPermission } from '@utils/camera.utils'
import { sleep } from '@utils/async.utils'

import { MenuBarcodesPanel } from '@menu-items/MenuBarcodes'

import '../styles.scss'
import pip from '@assets/store-scanner-beep.mp3'
const pipAudio = new Audio(pip)

import { Menu } from './Menu'
import { Main } from './Main'
import { AccessCameraLoader } from './AccessCameraLoader'
import { PermissionDenied } from './PermissionDenied'

// extracting only functions from the menu
export type ReactScannerLayoutRef = ConditionalPick<MenuState, (param: never) => void>

export interface ReactScannerLayoutProps {
  /** Component to show when accessing camera. */
  loaderComponent?: JSX.Element

  /** Component to show when user denied camera persmisson. */
  permissionDeniedComponent?: JSX.Element
}

export const ReactScannerLayout = forwardRef<ReactScannerLayoutRef, ReactScannerLayoutProps>(
  function ReactScannerLayout(props, ref) {
    const { loaderComponent, permissionDeniedComponent } = props

    const {
      isCameraPaused,
      isAccessingCamera,
      isCameraPermissionDenied,
      isCameraPermissionGranted,
      finishAccessingCamera,
    } = useCameraStore()

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

      requestCameraPermission()
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
          pipAudio.play()
        },
      })
    }

    async function requestCameraPermission() {
      try {
        await sleep(2000)

        await checkCameraPermission()
        finishAccessingCamera(true)
      } catch (error) {
        console.error('Error when accessing camera:', error)
        finishAccessingCamera(false)
      }
    }

    return (
      <div id="react-scanner-layout">
        <div className={clsx('fixed top-0 right-0 bottom-0 left-0', 'bg-black')}>
          <AnimatePresence>
            {isAccessingCamera && (
              <motion.div
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loaderComponent} ?? <AccessCameraLoader />
              </motion.div>
            )}
          </AnimatePresence>

          {isCameraPermissionDenied && (
            <motion.div
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {permissionDeniedComponent} ?? <PermissionDenied />
            </motion.div>
          )}

          {isCameraPermissionGranted && (
            <>
              <Menu />

              <AnimatePresence>
                {!isCameraPaused && (
                  <motion.div
                    transition={{ duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Main />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    )
  },
)
