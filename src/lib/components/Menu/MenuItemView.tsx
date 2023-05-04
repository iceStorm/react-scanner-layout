import clsx from 'clsx'
import { RxTriangleDown } from 'react-icons/rx'

import { MenuItem, useMenuStore } from '~store/menu'

interface HeaderItemViewProps {
  item: MenuItem
}

export function MenuItemView(props: HeaderItemViewProps) {
  const {
    icon: Icon,
    title,
    settingsPanel,
    toggleActiveOnClick,
    isActive,
    onClick,
    key,
  } = props.item

  const setActiveItem = useMenuStore((state) => state.setActiveItem)

  return (
    <button
      className={clsx(
        'flex-1 p-3',
        'flex flex-col items-center',
        'transition-all duration-100 hover:bg-stone-800',
        {
          'bg-stone-700 bg-opacity-50': isActive && settingsPanel,
        },
      )}
      style={{ minWidth: '85px' }}
      onClick={() => {
        onClick?.()
        setActiveItem(key)
      }}
    >
      <div
        className={clsx('flex flex-col items-center gap-1', 'transition-all duration-300', {
          'text-gray-500': toggleActiveOnClick && !isActive,
          'text-white': !toggleActiveOnClick || isActive,
        })}
      >
        {Icon}
        {typeof title === 'string' ? <span className="">{title}</span> : title}
      </div>

      {settingsPanel && <RxTriangleDown size={15} className="text-white" />}
    </button>
  )
}
