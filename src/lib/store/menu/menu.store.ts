import { create } from 'zustand'

import { MenuState } from './menu.state'

export const useMenuStore = create<MenuState>()((set) => ({
  items: [],
  isHidden: false,
  position: 'top',

  setPosition(position) {
    return set(() => ({ position: position }))
  },

  setMenuVisibility(visible) {
    return set(() => ({
      isHidden: visible,
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

        // const clonedItems = [...state.items]
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
    return set((state) => ({
      items: state.items.splice(index, 1),
    }))
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
