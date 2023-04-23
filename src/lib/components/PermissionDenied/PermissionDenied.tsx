import clsx from 'clsx'

import { IoReload } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'

export function PermissionDenied() {
  return (
    <div
      className={clsx(
        'h-screen px-10',
        'flex flex-col justify-center items-center gap-5',
        'text-center text-white',
      )}
    >
      <section className="flex flex-col items-center">
        <TiWarning size={75} className="text-yellow-500" />
        <h1 className="text-xl font-bold">Camera permission is prohibited on this page.</h1>
      </section>

      <section className="flex flex-col items-center gap-3">
        <p>Please grant camera access and reload this page in order to use this application.</p>

        <button
          className={clsx(
            'border border-green-500 text-green-500',
            'bg-green-900 bg-opacity-20 hover:bg-opacity-50',
            'transition-all duration-150',
            'rounded-full',
            'px-5 py-1 pl-2',
            'flex justify-center items-center gap-3',
          )}
          onClick={() => window.location.reload()}
        >
          <IoReload size={20} className="" />
          <span>Reload</span>
        </button>
      </section>
    </div>
  )
}
