import { useConfigStore } from '@store/config/config.store'

export function log(...message: unknown[]) {
  const useLogs = useConfigStore.getState().useLogs

  if (useLogs) {
    console.log('[React Scanner Layout]', ...getFormattedMessage(message))
  }
}

function getFormattedMessage(...message: unknown[]): Array<unknown> {
  return message.map((message) => {
    if (typeof message === 'string') {
      return message
    }

    return message || JSON.stringify(message)
  })
}
