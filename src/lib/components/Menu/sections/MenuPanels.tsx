import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import { useMenuStore } from '@store/menu'

export interface MenuPanelsProps {
  headerHeight?: number
}

export function MenuPanels({ headerHeight }: MenuPanelsProps) {
  const [menuPosition, menuItems] = useMenuStore((state) => [state.position, state.items])
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    console.log('headerHeight:', headerHeight)

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  function handleWindowResize() {
    console.log('window.innerHeight:', window.innerHeight)
    setWindowHeight(window.innerHeight)
  }

  const maxHeight = useMemo(() => {
    return windowHeight - (headerHeight || 185)
  }, [headerHeight, windowHeight])

  return (
    <section
      className={clsx({
        '-order-1': menuPosition === 'bottom',
        'order-3': menuPosition === 'top',
      })}
    >
      {menuItems.map((i) => {
        if (!i.settingsPanel) {
          return null
        }

        return (
          <div
            key={i.key}
            className={clsx(
              'border border-stone-700',
              'rounded-md overflow-hidden',
              'bg-stone-900',
              {
                hidden: !i.isActive,
              },
            )}
            style={{ maxHeight: maxHeight }}
          >
            <header className={clsx('px-5 py-3 border-b border-stone-700', 'font-medium')}>
              {i.title} settings.
            </header>

            <main className="overflow-y-auto p-5" style={{ maxHeight: maxHeight }}>
              {i.settingsPanel}
            </main>
          </div>
        )
      })}
    </section>
  )
}
