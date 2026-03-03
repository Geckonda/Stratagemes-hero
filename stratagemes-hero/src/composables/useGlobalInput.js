import { onMounted, onUnmounted } from 'vue'

export function useGlobalInput(handlers) {
  const onKeyDown = (e) => {
    if (e.repeat) return
    
    const handler = handlers[e.code]
    if (!handler) return

    e.preventDefault()
    handler()
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
  })
}