import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { log } from '~utils/logger.utils'

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

    toggleMenuVisibility() {
      set((state) => {
        if (state.isVisible) {
          for (const [index, item] of state.items.entries()) {
            if (item.settingsPanel) {
              state.items[index].isActive = false
            }
          }
        }

        state.isVisible = !state.isVisible
      })
    },

    addMenuItem(newItem) {
      set((state) => {
        const previousIndex = state.items.findIndex((i) => i.key === newItem.key)
        if (previousIndex !== -1) {
          // log(
          //   `The menu is already contain an item with key "${newItem.key}". Replaced by the old one by the new one.`.trim(),
          // )

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
        const itemIndex = state.items.findIndex((i) => i.key === key)
        if (itemIndex === -1) {
          log(`setActiveItem: There are no menu items with key "${key}".`)
          return
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
        state.items.forEach((item) => {
          if (item.settingsPanel && item.isActive) {
            item.isActive = false
          }
        })
      })
    },
  })),
)
