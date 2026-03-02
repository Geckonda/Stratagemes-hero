import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentStratagem: null,
    playerInput: [],
    score: 0,
    mistakes: 0,
    gameStatus: 'idle', // 'idle', 'playing', 'success', 'failed', 'gameover'
    timeLeft: 100,
    maxTime: 10,
    combo: 0,
    wrongInput: false,
    timerInterval: null
  }),
  
  getters: {
    timerProgress: (state) => {
      return (state.timeLeft / state.maxTime) * 100
    },
    inputProgress: (state) => {
      if (!state.currentStratagem) return 0
      return (state.playerInput.length / state.currentStratagem.code.length) * 100
    }
  },
  
  actions: {
    setCurrentStratagem(stratagem) {
      this.currentStratagem = stratagem
      this.playerInput = []
      this.wrongInput = false
    },
    
    startTimer() {
      if (this.timerInterval) return
      
      this.timerInterval = setInterval(() => {
        if (this.gameStatus === 'playing' && this.timeLeft > 0) {
          this.timeLeft--
          
          if (this.timeLeft === 0) {
            // Время вышло - GAME OVER!
            this.gameStatus = 'gameover'
            this.stopTimer()
            // Не увеличиваем mistakes, просто game over
          }
        }
      }, 1000)
    },
    
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    
    addTime(seconds) {
      this.timeLeft = Math.min(this.timeLeft + seconds, this.maxTime * 2)
    },
    
    resetTimer() {
      this.timeLeft = this.maxTime
    },
    
    addInput(direction) {
      if (this.gameStatus !== 'playing') return
      
      const currentIndex = this.playerInput.length
      const expectedDirection = this.currentStratagem.code[currentIndex]
      
      if (direction !== expectedDirection) {
        this.mistakes++
        this.combo = 0
        this.wrongInput = true

        this.playerInput = []
        
        setTimeout(() => {
            this.wrongInput = false
            }, 200)
        return
      }
      
      this.playerInput.push(direction)
      this.wrongInput = false
      
      if (this.playerInput.length === this.currentStratagem.code.length) {
        this.combo++
        this.score += 100 * this.combo
        this.addTime(1)
        this.gameStatus = 'success'
        this.stopTimer()
      }
    },
    
    resetGame() {
      this.playerInput = []
      this.mistakes = 0
      this.combo = 0
      this.gameStatus = 'idle'
      this.timeLeft = this.maxTime
      this.wrongInput = false
      this.stopTimer()
    },
    
    startGame() {
      this.gameStatus = 'playing'
      this.playerInput = []
      this.wrongInput = false
      this.startTimer()
    },
    
    // Метод для полного сброса игры (возврат на главный экран)
    gameOver() {
      this.gameStatus = 'gameover'
      this.stopTimer()
      // Не сбрасываем счет - покажем его на экране Game Over
    },
    
    // Возврат в главное меню
    returnToMenu() {
      this.currentStratagem = null // Убираем текущую стратагему
      this.resetGame() // Полный сброс
    }
  }
})