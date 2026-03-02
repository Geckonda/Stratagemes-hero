import { ref } from 'vue'

class SoundManager {
  constructor() {
    this.soundEnabled = ref(true)
    const baseUrl = import.meta.env.BASE_URL || ''

    this.pressAudio = new Audio(`${baseUrl}audio/key-press.mp3`)
    this.failAudio = new Audio(`${baseUrl}audio/key-press-fail.mp3`)
    
    this.pressAudio.volume = 0.5
    this.failAudio.volume = 0.5
  }

  playPress() {
    if (!this.soundEnabled.value) return
    this.pressAudio.currentTime = 0
    this.pressAudio.play()
  }

  playFail() {
    if (!this.soundEnabled.value) return
    this.failAudio.currentTime = 0
    this.failAudio.play()
  }

  toggle() {
    this.soundEnabled.value = !this.soundEnabled.value
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