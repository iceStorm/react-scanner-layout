import { useMemo, useRef } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { IconType } from 'react-icons'
import { RxTriangleDown } from 'react-icons/rx'
import { BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'

import { useCameraStore } from '@store/camera'
import { MenuItem, useMenuStore } from '@store/menu'

// tailwind-css: (m-3 === 12px) + (border === 1px)
const panelMargin = 12 + 2

export function Menu() {
  const {
    isHidden: isMenuHidden,
    setMenuVisibility,
    items: menuItems,
    position: menuPosition,
  } = useMenuStore()
  const { isCameraPaused, setCameraVisibility } = useCameraStore()

  const ref = useRef<HTMLDivElement>(null)

  const PauseResumeIcon: IconType = useMemo(() => {
    return isCameraPaused ? BsFillPlayFill : BsFillStopFill
  }, [isCameraPaused])

  const MenuIcon = useMemo(() => {
    if (isMenuHidden) {
      return menuPosition === 'top' ? VscTriangleDown : VscTriangleUp
    }

    return menuPosition === 'top' ? VscTriangleUp : VscTriangleDown
  }, [isMenuHidden, menuPosition])

  return (
    <header
      className={clsx(
        'absolute z-10 left-0 right-0 m-3',
        'flex flex-col gap-3 items-stretch',
        menuPosition === 'bottom' ? 'bottom-0' : 'top-0',
      )}
    >
      {/* menu items */}
      <motion.section
        ref={ref}
        className={clsx(
          'flex divide-x divide-stone-700',
          'max-w-lg mx-auto w-full overflow-x-auto',
          'bg-stone-900 border border-stone-700',
          'rounded-md overflow-hidden',
        )}
        animate={{
          marginTop:
            isMenuHidden && menuPosition === 'top'
              ? `-${(ref.current?.clientHeight ?? 0) + (panelMargin ?? 0)}px`
              : 0,

          marginBottom:
            isMenuHidden && menuPosition === 'bottom'
              ? `-${(ref.current?.clientHeight ?? 0) + (panelMargin ?? 0)}px`
              : 0,
        }}
        style={{ minWidth: '300px' }}
      >
        {menuItems.map((i) => {
          return <HeaderItemView key={i.key} item={i} />
        })}
      </motion.section>

      {/* control buttons */}
      <section
        className={clsx(
          'flex justify-center items-center gap-3',
          menuPosition === 'bottom' ? '-order-1' : 'order-1',
        )}
      >
        <button
          className={clsx(
            'flex items-center gap-1',
            'px-3 py-1',
            'text-xs text-white',
            'bg-stone-900 rounded-md hover:bg-stone-700',
            'border border-stone-700',
          )}
          onClick={() => setMenuVisibility(!isMenuHidden)}
        >
          <MenuIcon size={15} />
          <span>{isMenuHidden ? 'Menu' : 'Hide'}</span>
        </button>

        <button
          className={clsx(
            'flex items-center gap-1',
            'px-3 py-1',
            'text-xs text-white',
            'bg-stone-900 rounded-md hover:bg-stone-700',
            'border border-stone-700',
          )}
          onClick={() => setCameraVisibility(!isCameraPaused)}
        >
          <PauseResumeIcon size={15} />
          <span>{isCameraPaused ? 'Resume' : 'Pause'}</span>
        </button>
      </section>
    </header>
  )
}

interface HeaderItemViewProps {
  item: MenuItem
}

function HeaderItemView(props: HeaderItemViewProps) {
  const {
    icon: Icon,
    title,
    settingsPanel,
    toggleActiveOnClick,
    isActive,
    onClick,
    key,
  } = props.item
  const { setActiveItem } = useMenuStore()

  return (
    <button
      className={clsx(
        'flex-1 p-3',
        'flex flex-col items-center',
        'transition-all duration-100 hover:bg-stone-700',
      )}
      onClick={() => {
        onClick?.()
        setActiveItem(key)
      }}
    >
      <div
        className={clsx('flex flex-col items-center gap-1', {
          'text-gray-500': toggleActiveOnClick && !isActive,
          'text-white': !toggleActiveOnClick || isActive,
        })}
      >
        {Icon}
        {typeof title === 'string' ? <span className="text-xs">{title}</span> : title}
      </div>

      {settingsPanel && <RxTriangleDown size={15} className="text-white" />}
    </button>
  )
}
