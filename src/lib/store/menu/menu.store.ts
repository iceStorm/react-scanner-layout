import { create } from 'zustand'

import { MenuState } from './menu.state'

export const useMenuStore = create<MenuState>()((set) => ({
  items: [],
  isVisible: false,
  position: 'top',

  setPosition(position) {
    return set(() => ({ position: position }))
  },

  setMenuVisibility(visible) {
    return set(() => ({
      isVisible: visible,
    }))
  },

  addMenuItem(newItem) {
    return set((state) => {
      const previousIndex = state.items.findIndex((i) => i.key === newItem.key)
      if (previousIndex !== -1) {
        console.warn(
          `The menu is already contain an item with key "${newItem.key}".
          Replaced by the old one by the new one.`.trim(),
        )

        state.items.splice(previousIndex, 1, newItem)

        return {
          items: state.items,
        }
      }

      return {
        items: state.items.concat(newItem),
      }
    })
  },

  removeMenuItemAt(index) {
    return set((state) => {
      state.items.splice(index, 1)
      return { items: state.items }
    })
  },

  setActiveItem(key) {
    return set((state) => {
      console.log('key:', key)

      const itemIndex = state.items.findIndex((i) => i.key === key)
      if (itemIndex === -1) {
        console.warn(`setActiveItem: There are no menu items with key "${key}".`)
        return {}
      }

      state.items[itemIndex].isActive = !state.items[itemIndex].isActive

      return {
        items: state.items,
      }
    })
  },
}))
