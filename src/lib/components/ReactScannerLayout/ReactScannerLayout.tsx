import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import clsx from 'clsx'
import { ConditionalPick } from 'type-fest'
import { motion, AnimatePresence } from 'framer-motion'
import { shallow } from 'zustand/shallow'

import { useMenuStore, MenuState } from '~store/menu'
import { useCameraStore } from '~store/camera'
import { ScreenShotProps } from '~models/ScreenShot'
import { captureImageFromVideo } from '~utils/canvas.utilts'

import '../../styles.scss'

import { Menu } from '../Menu'
import { Main, MainRef } from '../Main'

import { AccessCameraLoader } from '../AccessCameraLoader'
import { PermissionDenied } from '../PermissionDenied'
import { CameraNotFound } from '../CameraNotFound'

// extracting only functions from the menu
export type ReactScannerLayoutRef = ConditionalPick<MenuState, (param: never) => void> & {
  captureScreenShot(specs?: ScreenShotProps): {
    toImageData(): ImageData | undefined
    toBase64(): string | undefined
  }
}

export interface ReactScannerLayoutProps {
  /** Component to show when accessing camera. */
  loaderComponent?: JSX.Element

  /** Component to show when user denied camera persmisson. */
  permissionDeniedComponent?: JSX.Element

  /** Component to show when not found any active camera. */
  cameraNotFoundComponent?: JSX.Element
}

export const ReactScannerLayout = forwardRef<ReactScannerLayoutRef, ReactScannerLayoutProps>(
  function (props, ref) {
    const { loaderComponent, permissionDeniedComponent, cameraNotFoundComponent } = props

    const [
      selectedCamera,
      isAccessingCamera,
      isCameraPermissionDenied,
      isCameraNotFound,
      requestCamera,
    ] = useCameraStore(
      (state) => [
        state.selectedCamera,
        state.isAccessingCamera,
        state.isCameraPermissionDenied,
        state.isCameraNotFound,
        state.requestCamera,
      ],
      shallow,
    )

    const [
      addMenuItem,
      removeMenuItemAt,
      toggleMenuVisibility,
      setPosition,
      setActiveItem,
      hideActiveMenuPanel,
    ] = useMenuStore(
      (state) => [
        state.addMenuItem,
        state.removeMenuItemAt,
        state.toggleMenuVisibility,
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
      toggleMenuVisibility,
      setPosition,
      setActiveItem,
      hideActiveMenuPanel,
      captureScreenShot() {
        return {
          toImageData() {
            if (mainRef.current?.videoRef.current && selectedCamera?.stream) {
              return captureImageFromVideo(mainRef.current?.videoRef.current).toImageData()
            }
          },
          toBase64() {
            if (mainRef.current?.videoRef.current && selectedCamera?.stream) {
              return captureImageFromVideo(mainRef.current?.videoRef.current).toBase64()
            }
          },
        }
      },
    }))

    const mainRef = useRef<MainRef>(null)

    useEffect(() => {
      requestCamera()
    }, [])

    return (
      <div id="react-scanner-layout" style={{ flex: '1 1 0%' }}>
        <div className={clsx('relative', 'bg-black', 'text-xs xl:text-sm text-white')}>
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

          {!isAccessingCamera && isCameraPermissionDenied && (
            <motion.div
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              {permissionDeniedComponent ?? <PermissionDenied />}
            </motion.div>
          )}

          {!isAccessingCamera && isCameraNotFound && (
            <motion.div
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              {cameraNotFoundComponent ?? <CameraNotFound />}
            </motion.div>
          )}

          {!isAccessingCamera && !isCameraPermissionDenied && !isCameraNotFound && (
            <>
              <Menu />
              <Main ref={mainRef} />
            </>
          )}
        </div>
      </div>
    )
  },
)
