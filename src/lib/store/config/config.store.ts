import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

import { ConfigState } from './config.state'

export const useConfigStore = create(
  persist(
    immer<ConfigState>(() => ({
      useLogs: true,
    })),
    {
      name: 'rsl-config-store',
    },
  ),
)
