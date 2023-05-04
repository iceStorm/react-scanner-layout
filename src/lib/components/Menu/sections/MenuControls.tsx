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
      className={clsx(
        'flex justify-center items-center gap-3',
        menuPosition === 'bottom' ? 'order-3' : '-order-1',
      )}
    >
      <button
        className={clsx(
          'flex items-center gap-1',
          'px-3 py-1',
          'text-white',
          'bg-stone-900 rounded-md hover:bg-stone-700',
          'border border-stone-700',
        )}
        onClick={() => toggleMenuVisibility()}
      >
        <MenuIcon size={15} />
        <span>{isMenuVisible ? 'Hide' : 'Menu'}</span>
      </button>

      <button
        className={clsx(
          'flex items-center gap-1',
          'px-3 py-1',
          'text-white',
          'bg-stone-900 rounded-md hover:bg-stone-700',
          'border border-stone-700',
        )}
        onClick={() => toggleCameraVisibility()}
      >
        <PauseResumeIcon size={15} />
        <span>{isCameraPaused ? 'Resume' : 'Pause'}</span>
      </button>
    </section>
  )
})
