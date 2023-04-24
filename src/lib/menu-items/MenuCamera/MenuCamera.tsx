import { useEffect } from 'react'

import clsx from 'clsx'
import { shallow } from 'zustand/shallow'
import Checkbox from '@mui/material/Checkbox'

import { useCameraStore } from '@store/camera'

import styles from './MenuCamera.module.scss'

export function MenuCamera() {
  const [
    cameraList,
    selectedCamera,
    selectedCameraSettings,
    avalableResolutions,
    setSelectedCamera,
    setSelectedCameraSettings,
  ] = useCameraStore(
    (state) => [
      state.cameraList,
      state.selectedCamera,
      state.selectedCameraSettings,
      state.avalableResolutions,
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
                className={clsx('btn-toggle', {
                  active: camera.deviceId === selectedCamera?.deviceId,
                })}
                onClick={() => setSelectedCamera(camera)}
              >
                {camera.label}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3">
          Select a resolution for the selected camera "{selectedCamera?.label}"
        </h2>

        <div className={styles.resolutionGrid}>
          {avalableResolutions.map(({ width, height, name }) => {
            return (
              <button
                key={name}
                className={clsx('btn-toggle', {
                  active:
                    selectedCameraSettings?.width === width &&
                    selectedCameraSettings?.height === height,
                })}
                onClick={() => setSelectedCameraSettings({ width, height })}
              >
                <p className="mb-1">{name}</p>
                <p>
                  <span>{width}</span> × <span>{height}</span>
                </p>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 setting-headline">Other settings.</h2>

        <p className="-ml-3 -mt-3 flex items-center">
          <label>
            <Checkbox
              size="small"
              color="primary"
              checked={Boolean(selectedCameraSettings?.mirrored)}
              onChange={(e) => setSelectedCameraSettings({ mirrored: e.target.checked })}
            />
            <span className='-ml-1'>Mirrored</span>
          </label>
        </p>
      </section>
    </div>
  )
}
