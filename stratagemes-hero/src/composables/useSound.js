// src/composables/useSound.js
import { ref } from 'vue'

export function useSound() {
  const soundEnabled = ref(true)
  
  // Предзагружаем звуки
  const pressAudio = new Audio('/audio/key-press.mp3')
  const failAudio = new Audio('/audio/key-press-fail.mp3')
  
  pressAudio.volume = 0.5
  failAudio.volume = 0.5
  
  const playPressSound = () => {
    if (!soundEnabled.value) return
    
    // Перематываем в начало и играем
    pressAudio.currentTime = 0
    pressAudio.play().catch(e => console.log('Audio play failed:', e))
  }
  
  const playFailSound = () => {
    if (!soundEnabled.value) return
    
    failAudio.currentTime = 0
    failAudio.play().catch(e => console.log('Audio play failed:', e))
  }
  
  const toggleSound = () => {
    soundEnabled.value = !soundEnabled.value
    console.log('Sound enabled:', soundEnabled.value)
  }
  
  return {
    soundEnabled,
    playPressSound,
    playFailSound,
    toggleSound
  }
}