import { useMemo } from 'react'

import clsx from 'clsx'
import { shallow } from 'zustand/shallow'
import { IoVideocam } from 'react-icons/io5'

import { useCameraStore } from '~store/camera'
import { MenuItem } from '~store/menu'

import './MenuCamera.scss'

export function MenuCameraPanel() {
  const [
    isCameraPaused,
    cameraList,
    selectedCamera,
    avalableResolutions,
    // setSelectedCameraSettings,
    requestCamera,
  ] = useCameraStore(
    (state) => [
      state.isCameraPaused,
      state.cameraList,
      state.selectedCamera,
      state.avalableResolutions,
      // state.setSelectedCameraSettings,
      state.requestCamera,
    ],
    shallow,
  )

  const selectedCameraInfo = useMemo(() => {
    return cameraList.find((c) => c.deviceId === selectedCamera?.deviceId)
  }, [selectedCamera, cameraList])

  return (
    <div
      className={clsx('rsl-preset-menu menu-camera', {
        // 'pointer-events-none text-gray-700': isCameraPaused,
      })}
    >
      <section>
        <p className="rsl-preset-menu-headline">Pick a camera from your device</p>

        <div className="camera-grid">
          {cameraList.map((camera) => {
            return (
              <button
                key={camera.deviceId}
                className={clsx('rsl-btn-toggle', {
                  active: camera.deviceId === selectedCamera?.deviceId,
                  // 'text-gray-500': isCameraPaused,
                })}
                onClick={() => {
                  console.log('Selected camera:', camera)
                  requestCamera({ video: { deviceId: camera.deviceId } })
                }}
              >
                {camera.label}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <p className="rsl-preset-menu-headline">
          Select a resolution for the camera "{selectedCameraInfo?.label}". Higher is better.
        </p>

        <div className="resolution-grid">
          {avalableResolutions.map(({ width, height, name }) => {
            return (
              <button
                key={name}
                className={clsx('rsl-btn-toggle', {
                  active:
                    (selectedCamera?.width === width && selectedCamera?.height === height) ||
                    (selectedCamera?.width === height && selectedCamera?.height === width),
                  'text-gray-500': isCameraPaused,
                })}
                onClick={(e) => {
                  requestCamera({ video: { width, height } })
                  e.currentTarget.blur()
                }}
              >
                <p className="">{name}</p>
                <div>
                  <span>{width}</span> × <span>{height}</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <p className="rsl-preset-menu-headline">Other settings</p>

        <div>
          <label>
            {/* <Switch
              checked={!!selectedCamera?.mirrored}
              onChange={(checked) => setSelectedCameraSettings({ mirrored: checked })}
              className={`${
                selectedCamera?.mirrored
                  ? isCameraPaused
                    ? 'bg-blue-900'
                    : 'bg-blue-500'
                  : 'bg-stone-500'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Mirrored</span>
              <span
                className={`${
                  selectedCamera?.mirrored ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch> */}

            <span className="cursor-pointer">Mirrored</span>
          </label>
        </div>
      </section>
    </div>
  )
}

export const MenuCamera: MenuItem = {
  key: 'camera',
  title: 'Camera',
  icon: <IoVideocam size={20} />,
  settingsPanel: <MenuCameraPanel />,
}
