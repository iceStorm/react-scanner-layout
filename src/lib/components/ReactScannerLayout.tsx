import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import clsx from 'clsx'
import { ConditionalPick } from 'type-fest'
import { motion, AnimatePresence } from 'framer-motion'

import { RiBarcodeLine } from 'react-icons/ri'
import { IoMusicalNote, IoVideocam } from 'react-icons/io5'
import { CiBarcode } from 'react-icons/ci'

import { useMenuStore, MenuState } from '@store/menu'
import { useCameraStore } from '@store/camera'

import { checkCameraPermission, getCameraList } from '@utils/camera.utils'
// import { sleep } from '@utils/async.utils'

import { MenuBarcodesPanel } from '@menu-items/MenuBarcodes'
import { MenuCamera } from '@menu-items/MenuCamera'

import '../styles.scss'
import pip from '@assets/store-scanner-beep.mp3'
const pipAudio = new Audio(pip)

import { Menu } from './Menu'
import { Main } from './Main'
import { AccessCameraLoader } from './AccessCameraLoader'
import { PermissionDenied } from './PermissionDenied'
import { shallow } from 'zustand/shallow'

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

    const [
      isAccessingCamera,
      isCameraPermissionDenied,
      isCameraPermissionGranted,
      finishAccessingCamera,
      setCameraList,
      setSelectedCamera,
      setSelectedCameraSettings,
    ] = useCameraStore(
      (state) => [
        state.isAccessingCamera,
        state.isCameraPermissionDenied,
        state.isCameraPermissionGranted,
        state.finishAccessingCamera,
        state.setCameraList,
        state.setSelectedCamera,
        state.setSelectedCameraSettings,
      ],
      shallow,
    )

    const [
      addMenuItem,
      removeMenuItemAt,
      setMenuVisibility,
      setPosition,
      setActiveItem,
      hideActiveMenuPanel,
    ] = useMenuStore(
      (state) => [
        state.addMenuItem,
        state.removeMenuItemAt,
        state.setMenuVisibility,
        state.setPosition,
        state.setActiveItem,
        state.hideActiveMenuPanel,
      ],
      shallow,
    )

    // handle ref impelmentations here
    useImperativeHandle(ref, () => ({
      addMenuItem,
      removeMenuItemAt,
      setMenuVisibility,
      setPosition,
      setActiveItem,
      hideActiveMenuPanel,
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
        settingsPanel: <MenuCamera />,
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
          <p className="">
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
        // await sleep(2000)

        const cameraSettings = await checkCameraPermission()
        const cameraList = await getCameraList()

        console.log('Camera settings:', cameraSettings)

        finishAccessingCamera(true)
        setCameraList(
          cameraList,
          // .concat(cameraList)
          // .concat(cameraList)
          // .concat(cameraList)
          // .concat(cameraList)
          // .concat(cameraList),
        )
        setSelectedCamera(cameraList[0])
        setSelectedCameraSettings(cameraSettings)
      } catch (error) {
        console.error('Error when accessing camera:', error)
        finishAccessingCamera(false)
      }
    }

    return (
      <div id="react-scanner-layout">
        <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
          <div className={clsx('fixed inset-0', 'bg-black', 'text-xs xl:text-sm text-white')}>
            <AnimatePresence>
              {isAccessingCamera && (
                <motion.div
                  transition={{ duration: 0.5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  {loaderComponent ?? <AccessCameraLoader />}
                </motion.div>
              )}
            </AnimatePresence>

            {isCameraPermissionDenied && (
              <motion.div
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                {permissionDeniedComponent ?? <PermissionDenied />}
              </motion.div>
            )}

            {isCameraPermissionGranted && (
              <>
                <Menu />
                <Main />
              </>
            )}
          </div>
        </ThemeProvider>
      </div>
    )
  },
)
