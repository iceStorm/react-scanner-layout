import { motion } from 'framer-motion'

import spinnerIcon from '~assets/green-spinner.png'

import './AccessCameraLoader.scss'

export function AccessCameraLoader() {
  return (
    <div className="rsl-preset-page page-access-camera-loader">
      <motion.img
        src={spinnerIcon}
        transition={{ ease: 'linear', duration: 1, repeat: Infinity }}
        animate={{ rotate: 360 }}
      />
      <h1>Accessing camera</h1>
    </div>
  )
}
