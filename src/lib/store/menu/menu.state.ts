import { ReactNode } from 'react'

export interface MenuItem {
  key: string
  title: ReactNode
  icon: ReactNode

  settingsPanel?: ReactNode
  isActive?: boolean
  toggleActiveOnClick?: boolean

  onClick?: () => void
}

export type MenuPosition = 'top' | 'bottom'

export interface MenuState {
  items: MenuItem[]
  isVisible: boolean
  position: MenuPosition

  setPosition(position: MenuPosition): void
  toggleMenuVisibility(): void
  addMenuItem(item: MenuItem): void
  removeMenuItemAt(index: number): void

  setActiveItem(key: string): void
  hideActiveMenuPanel(): void
}
