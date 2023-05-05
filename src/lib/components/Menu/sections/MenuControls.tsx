import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import { IconType } from 'react-icons'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'

import { useMenuStore } from '~store/menu'
import { useCameraStore } from '~store/camera'

export const MenuControls = forwardRef<HTMLDivElement>(function (_props, ref) {
  const [toggleMenuVisibility, menuPosition, isMenuVisible] = useMenuStore((state) => [
    state.toggleMenuVisibility,
    state.position,
    state.isVisible,
  ])

  const [isCameraPaused, toggleCameraVisibility] = useCameraStore((state) => [
    state.isCameraPaused,
    state.toggleCameraVisibility,
    state.requestCamera,
  ])

  const MenuIcon = useMemo(() => {
    if (!isMenuVisible) {
      return menuPosition === 'top' ? VscTriangleDown : VscTriangleUp
    }

    return menuPosition === 'top' ? VscTriangleUp : VscTriangleDown
  }, [isMenuVisible, menuPosition])

  const PauseResumeIcon: IconType = useMemo(() => {
    return isCameraPaused ? BsFillPlayFill : BsFillStopFill
  }, [isCameraPaused])

  return (
    <section
      ref={ref}
      className={clsx('rsl-menu-controls', menuPosition === 'bottom' ? 'order-3' : '-order-1')}
    >
      <button className="rsl-menu-controls-button" onClick={() => toggleMenuVisibility()}>
        <MenuIcon size={15} />
        <span>{isMenuVisible ? 'Hide' : 'Menu'}</span>
      </button>

      <button className="rsl-menu-controls-button" onClick={() => toggleCameraVisibility()}>
        <PauseResumeIcon size={15} />
        <span>{isCameraPaused ? 'Resume' : 'Pause'}</span>
      </button>
    </section>
  )
})
