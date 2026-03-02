import { ref } from 'vue'

class SoundManager {
  constructor() {
    this.soundEnabled = ref(true)
    this.pressAudio = new Audio('/audio/key-press.mp3')
    this.failAudio = new Audio('/audio/key-press-fail.mp3')
    
    this.pressAudio.volume = 0.5
    this.failAudio.volume = 0.5
  }

  playPress() {
    if (!this.soundEnabled.value) return
    this.pressAudio.currentTime = 0
    this.pressAudio.play().catch(e => console.log('Audio play failed:', e))
  }

  playFail() {
    if (!this.soundEnabled.value) return
    this.failAudio.currentTime = 0
    this.failAudio.play().catch(e => console.log('Audio play failed:', e))
  }

  toggle() {
    this.soundEnabled.value = !this.soundEnabled.value
    console.log('Sound enabled:', this.soundEnabled.value)
  }
}

// Создаем один экземпляр для всего приложения
const soundManager = new SoundManager()

export function useSound() {
  return {
    soundEnabled: soundManager.soundEnabled,
    playPressSound: () => soundManager.playPress(),
    playFailSound: () => soundManager.playFail(),
    toggleSound: () => soundManager.toggle()
  }
}