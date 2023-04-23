import { useEffect, useMemo, useRef } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { useMenuStore } from '@store/menu'

import { MenuItemView } from './MenuItemView'
import { MenuPanels } from './sections/MenuPanels'
import { MenuControls } from './sections/MenuControls'

// tailwind-css: (m-3 === 12px) + (border === 1px)
const panelMargin = 12 * 2 + 2

export function Menu() {
  const [menuItems, isMenuVisible, menuPosition] = useMenuStore((state) => [
    state.items,
    state.isVisible,
    state.position,
  ])

  const menuRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const marginTop = useMemo(() => {
    return !isMenuVisible && menuPosition === 'top'
      ? `-${
          (menuRef.current?.clientHeight ?? 0) +
          (buttonsRef.current?.clientHeight ?? 0) +
          (panelMargin ?? 0)
        }px`
      : 0
  }, [isMenuVisible, menuPosition])

  const marginBottom = useMemo(() => {
    return !isMenuVisible && menuPosition === 'bottom'
      ? `-${
          (menuRef.current?.clientHeight ?? 0) +
          (buttonsRef.current?.clientHeight ?? 0) +
          (panelMargin ?? 0)
        }px`
      : 0
  }, [isMenuVisible, menuPosition])

  const headeHeight = useMemo(() => {
    return (menuRef.current?.clientHeight ?? 0) + (buttonsRef.current?.clientHeight ?? 0)
  }, [])

  useEffect(() => {
    //
    console.log('menuRef.current?.clientHeight:', menuRef.current?.clientHeight)
  }, [])

  return (
    <header
      className={clsx(
        'absolute inset-x-0 z-10 mx-auto max-w-3xl',
        menuPosition === 'bottom' ? 'bottom-0' : 'top-0',
      )}
    >
      <div className="m-3 flex flex-col gap-3">
        {/* menu items */}
        <motion.section
          ref={menuRef}
          className={clsx(
            'flex divide-x divide-stone-700',
            'mx-auto w-full overflow-x-auto',
            'bg-stone-900 border border-stone-700',
            'rounded-md overflow-hidden',
          )}
          transition={{}}
          initial={{
            opacity: 0,
          }}
          animate={{
            marginTop,
            marginBottom,
            opacity: 1,
          }}
          style={{ minWidth: '200px' }}
        >
          {menuItems.map((i) => {
            return <MenuItemView key={i.key} item={i} />
          })}
        </motion.section>

        {/* control buttons */}
        <MenuControls ref={buttonsRef} />

        {/* menu panels */}
        <MenuPanels headerHeight={headeHeight} />
      </div>
    </header>
  )
}
