import { useMemo } from 'react'
import clsx from 'clsx'

import { useMenuStore } from '~store/menu'

export interface MenuPanelsProps {
  headerHeight?: number
  layoutHeight: number
}

export function MenuPanels({ headerHeight, layoutHeight }: MenuPanelsProps) {
  const [menuPosition, menuItems] = useMenuStore((state) => [state.position, state.items])

  const maxHeight = useMemo(() => {
    return layoutHeight - (headerHeight || 0)
  }, [headerHeight, layoutHeight])

  return (
    <section className={clsx('rsl-menu-panels', menuPosition)}>
      {menuItems.map((i) => {
        if (!i.settingsPanel) {
          return null
        }

        return (
          <div
            key={i.key}
            className={clsx('rsl-menu-panels-tab', {
              hidden: !i.isActive,
            })}
          >
            <header className="rsl-menu-panels-header">{i.title} settings.</header>

            <main className="rsl-menu-panels-main" style={{ maxHeight: maxHeight }}>
              {i.settingsPanel}
            </main>
          </div>
        )
      })}
    </section>
  )
}
