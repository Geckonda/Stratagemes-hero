import { onMounted, onUnmounted } from 'vue'

export function useKeyHandler(handler) {
  const keyMap = {
    'ArrowUp': '⬆️',
    'ArrowDown': '⬇️', 
    'ArrowLeft': '⬅️',
    'ArrowRight': '➡️',
    'KeyW': '⬆️',
    'KeyS': '⬇️',
    'KeyA': '⬅️',
    'KeyD': '➡️',
  }
  
  const handleKeyDown = (event) => {
    const direction = keyMap[event.code]
    
    if (direction) {
      event.preventDefault()
      handler(direction)
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