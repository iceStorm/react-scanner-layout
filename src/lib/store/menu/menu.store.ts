import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { MenuState } from './menu.state'

export const useMenuStore = create(
  immer<MenuState>((set) => ({
    items: [],
    isVisible: true,
    position: 'top',

    setPosition(position) {
      set((state) => {
        state.position = position
      })
    },

    setMenuVisibility(visible) {
      set((state) => {
        state.isVisible = visible

        if (!visible) {
          state.items
            .filter((i) => Boolean(i.settingsPanel))
            .forEach((i) => {
              i.isActive = false
            })
        }
      })
    },

    addMenuItem(newItem) {
      set((state) => {
        console.log('addMenuItem:', state.items)

        const previousIndex = state.items.findIndex((i) => i.key === newItem.key)
        if (previousIndex !== -1) {
          console.warn(
            `The menu is already contain an item with key "${newItem.key}".
          Replaced by the old one by the new one.`.trim(),
          )

          state.items.splice(previousIndex, 1, newItem)
          return
        }

        state.items.push(newItem)
      })
    },

    removeMenuItemAt(index) {
      set((state) => {
        state.items.splice(index, 1)
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
      })
    },

    hideActiveMenuPanel() {
      return set((state) => {
        const activeMenuPanels = state.items.some((i) => Boolean(i.settingsPanel) && i.isActive)

        if (activeMenuPanels) {
          console.log('hideActiveMenuPanel...')
          state.items.forEach((item) => {
            if (item.settingsPanel) {
              item.isActive = false
            }
          })
        }
      })
    },
  })),
)
