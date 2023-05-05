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
      className={clsx('rsl-menu-buttons-btn', {
        active: isActive,
        togglerable: toggleActiveOnClick,
      })}
      style={{ minWidth: '85px' }}
      onClick={() => {
        onClick?.()
        setActiveItem(key)
      }}
    >
      <div>
        {Icon}
        {typeof title === 'string' ? <span className="">{title}</span> : title}
      </div>

      {settingsPanel && <RxTriangleDown size={15} />}
    </button>
  )
}
