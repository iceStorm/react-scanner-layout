import clsx from 'clsx'

import { IoReload } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'

export function CameraNotFound() {
  return (
    <div
      className={clsx(
        'h-full px-10',
        'flex flex-col justify-center items-center gap-5',
        'text-center text-white',
      )}
    >
      <section className="flex flex-col items-center">
        <TiWarning size={75} className="text-yellow-500" />
        <h1 className="text-xl font-bold">No camera found.</h1>
      </section>

      <section className="flex flex-col items-center gap-3">
        <p>
          <span>
            Maybe your device contains no camera; the camera is broken; or your device went into
            sleep mode.
          </span>
          &nbsp;
          <span>Reload this page to see if your camera works again.</span>
        </p>

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
