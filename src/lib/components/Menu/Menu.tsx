import { useEffect, useMemo, useRef } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { useMenuStore } from '~store/menu'

import { MenuItemView } from './MenuItemView'
import { MenuPanels } from './sections/MenuPanels'
import { MenuControls } from './sections/MenuControls'

const panelMargin = 15 * 2 + 5

interface MenuProps {
  layoutHeight: number
}

export function Menu({ layoutHeight }: MenuProps) {
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
    console.log('menuRef.current?.clientHeight:', menuRef.current?.clientHeight)
    console.log('layoutHeight:', layoutHeight)
  }, [])

  return (
    <header className={clsx('rsl-menu', menuPosition)}>
      <div className="rsl-menu-wrapper">
        {/* control buttons */}
        <MenuControls ref={buttonsRef} />

        {/* menu items */}
        <motion.section
          ref={menuRef}
          className="rsl-menu-buttons"
          initial={{
            opacity: 0,
          }}
          animate={{
            marginTop,
            marginBottom,
            opacity: 1,
          }}
          style={{ minWidth: '300px' }}
        >
          {menuItems.map((i) => {
            return <MenuItemView key={i.key} item={i} />
          })}
        </motion.section>

        {/* menu panels */}
        <MenuPanels headerHeight={headeHeight} layoutHeight={layoutHeight} />
      </div>
    </header>
  )
}
