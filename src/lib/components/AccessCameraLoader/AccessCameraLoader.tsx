import clsx from 'clsx'
import { motion } from 'framer-motion'

import spinnerIcon from '~assets/green-spinner.png'

export function AccessCameraLoader() {
  return (
    <div
      className={clsx('h-full', 'flex flex-col justify-center items-center gap-3', 'text-white')}
    >
      <motion.img
        src={spinnerIcon}
        transition={{ ease: 'linear', duration: 1, repeat: Infinity }}
        animate={{ rotate: 360 }}
        className="w-14"
      />
      <h1>Accessing camera</h1>
    </div>
  )
}
