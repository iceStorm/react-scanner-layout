import { IoReload } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'

import './CameraNotFound.scss'

export function CameraNotFound() {
  return (
    <div className="rsl-preset-page page-camera-not-found">
      <section>
        <TiWarning size={75} />
        <h1>No camera found.</h1>
      </section>

      <section>
        <p>
          <span>
            Maybe your device contains no camera; the camera is broken; or your device went into
            sleep mode.
          </span>
          &nbsp;
          <span>Reload this page to see if your camera works again.</span>
        </p>

        <button onClick={() => window.location.reload()}>
          <IoReload size={20} className="" />
          <span>Reload</span>
        </button>
      </section>
    </div>
  )
}
