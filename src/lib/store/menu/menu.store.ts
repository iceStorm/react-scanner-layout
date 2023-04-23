import { create } from 'zustand'

import { MenuState } from './menu.state'

export const useMenuStore = create<MenuState>()((set) => ({
  items: [],
  isVisible: true,
  position: 'top',

  setPosition(position) {
    set(() => ({ position: position }))
  },

  setMenuVisibility(visible) {
    set((state) => {
      if (!visible) {
        state.items
          .filter((i) => Boolean(i.settingsPanel))
          .forEach((i) => {
            i.isActive = false
          })
      }

      return {
        items: state.items,
        isVisible: visible,
      }
    })
  },

  addMenuItem(newItem) {
    set((state) => {
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
    set((state) => {
      state.items.splice(index, 1)
      return { items: state.items }
    })
  },

  setActiveItem(key) {
    set((state) => {
      // console.log('key:', key)

      const itemIndex = state.items.findIndex((i) => i.key === key)
      if (itemIndex === -1) {
        console.warn(`setActiveItem: There are no menu items with key "${key}".`)
        return {}
      }

      // close other panels
      state.items
        .filter((i) => i.key !== key && Boolean(i.settingsPanel))
        .forEach((i) => (i.isActive = false))

      // toggle clicked panels
      state.items[itemIndex].isActive = !state.items[itemIndex].isActive

      return {
        items: state.items,
      }
    })
  },

  hideActiveMenuPanel() {
    return set((state) => {
      const activeMenuPanels = state.items.some((i) => Boolean(i.settingsPanel) && i.isActive)

      if (activeMenuPanels) {
        console.log('hideActiveMenuPanel...')
        state.items.filter((i) => Boolean(i.settingsPanel)).forEach((i) => (i.isActive = false))
      }

      return {
        items: state.items,
      }
    })
  },
}))
