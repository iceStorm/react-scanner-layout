import { create } from 'zustand'

import { MenuState } from './menu.state'

export const useMenuStore = create<MenuState>()((set) => ({
  items: [],
  isMenuHidden: false,

  setMenuVisibility(visible) {
    return set(() => ({
      isMenuHidden: visible,
    }))
  },

  addMenuItem(item) {
    return set((state) => ({
      items: state.items.concat(item),
    }))
  },

  removeMenuItemAt(index) {
    return set((state) => ({
      items: state.items.splice(index, 1),
    }))
  },
}))
