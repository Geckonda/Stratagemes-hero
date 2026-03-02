import { onMounted, onUnmounted } from 'vue'

export function useKeyHandler(handler) {
  const keyMap = {
    'ArrowUp': '⬆️',
    'ArrowDown': '⬇️',
    'ArrowLeft': '⬅️',
    'ArrowRight': '➡️'
  }
  
  const handleKeyDown = (event) => {
    if (keyMap[event.key]) {
      event.preventDefault()
      handler(keyMap[event.key])
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
  
  return { keyMap }
}