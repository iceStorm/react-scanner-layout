import { useEffect } from 'react'

import clsx from 'clsx'
import { shallow } from 'zustand/shallow'

import Switch from '@mui/material/Switch'

import { CameraResolution, useCameraStore } from '@store/camera'

import styles from './MenuCamera.module.scss'

const cametaResolutionList: CameraResolution[] = [
  {
    name: 'Default',
    width: 1,
    height: 2,
  },
  {
    name: 'HD',
    width: 1280,
    height: 720,
  },
  {
    name: 'Full HD',
    width: 1920,
    height: 1080,
  },
  {
    name: '2K',
    width: 2048,
    height: 1080,
  },
  {
    name: '4K',
    width: 3840,
    height: 2160,
  },
]

export function MenuCamera() {
  const [
    cameraList,
    selectedCamera,
    selectedCameraSettings,
    setSelectedCamera,
    setSelectedCameraSettings,
  ] = useCameraStore(
    (state) => [
      state.cameraList,
      state.selectedCamera,
      state.selectedCameraSettings,
      state.setSelectedCamera,
      state.setSelectedCameraSettings,
    ],
    shallow,
  )

  useEffect(() => {
    //
  }, [])

  return (
    <div className={clsx('flex flex-col gap-10')}>
      <section>
        <h2 className="mb-3">Pick a camera from your device</h2>

        <div className={styles.cameraGrid}>
          {cameraList.map((camera) => {
            return (
              <button
                key={camera.deviceId}
                className={clsx(
                  'border border-stone-700',
                  'px-5 py-2',
                  'rounded-md cursor-pointer',
                  {
                    'bg-stone-700': camera.deviceId === selectedCamera?.deviceId,
                  },
                )}
                onClick={() => setSelectedCamera(camera)}
              >
                {camera.label}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3">Set resolution for the selected camera "{selectedCamera?.label}"</h2>

        <div className={styles.resolutionGrid}>
          {cametaResolutionList.map(({ width, height, name }) => {
            return (
              <button
                key={name}
                className={clsx(
                  'px-5 py-2',
                  'flex flex-col items-center gap-1',
                  'border border-stone-700',
                  'rounded-md cursor-pointer',
                  {
                    'bg-stone-700':
                      selectedCameraSettings?.width === width &&
                      selectedCameraSettings?.height === height,
                  },
                )}
                style={{ minWidth: '100px' }}
                onClick={() => setSelectedCameraSettings({ width, height })}
              >
                <span>{name}</span>
                <p>
                  <span>{width}</span>:<span>{height}</span>
                </p>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3">Other settings.</h2>

        <p className="-ml-2">
          <label>
            <Switch
              size="small"
              checked={Boolean(selectedCameraSettings?.mirrored)}
              onChange={(e) => setSelectedCameraSettings({ mirrored: e.target.checked })}
            />
            <span>Mirrored</span>
          </label>
        </p>
      </section>
    </div>
  )
}
