export interface MenuItem {
  title: React.ReactNode
  icon: JSX.Element
}

export interface MenuState {
  items: MenuItem[]
  isMenuHidden: boolean

  setMenuVisibility(visible: boolean): void
  addMenuItem(item: MenuItem): void
  removeMenuItemAt(index: number): void
}
