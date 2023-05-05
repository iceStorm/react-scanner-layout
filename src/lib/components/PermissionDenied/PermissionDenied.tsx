import { IoReload } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'

import './PermissionDenied.scss'

export function PermissionDenied() {
  return (
    <div className="rsl-preset-page page-permission-denied">
      <section>
        <TiWarning size={75} />
        <h1>Camera permission is prohibited on this page.</h1>
      </section>

      <section>
        <p>Please grant camera access and reload this page in order to use this function.</p>

        <button onClick={() => window.location.reload()}>
          <IoReload size={20} />
          <span>Reload</span>
        </button>
      </section>
    </div>
  )
}
