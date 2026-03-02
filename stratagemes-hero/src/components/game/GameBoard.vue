<template>
  <div class="game-board">
    <Timer 
      :time-left="gameStore.timeLeft"
      :max-time="gameStore.maxTime"
    />
    
    <StratagemDisplay 
      :stratagem="gameStore.currentStratagem"
      :player-input="gameStore.playerInput"
      :input-progress="gameStore.inputProgress"
      :wrong-input="gameStore.wrongInput" 
    />
    
    <InputHandler @input="handleInput" />
    

    
    
    <!-- Game Over сообщение -->
    <div v-if="gameStore.gameStatus === 'gameover'" class="gameover-overlay">
      <div class="gameover-content">
        <h1>⏰ Провал ⏰</h1>
        <div class="final-score">
          <p>Твой счет: {{ gameStore.score }}</p>
          <p>Ошибок: {{ gameStore.mistakes }}</p>
          <p>Максимальное комбо: {{ gameStore.combo }}</p>
        </div>
        <button @click="returnToMenu" class="menu-button">
          В главное меню
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useStratagemsStore } from '@/stores/stratagemsStore'
import Timer from './Timer.vue'
import StratagemDisplay from './StratagemDisplay.vue'
import InputHandler from './InputHandler.vue'

const gameStore = useGameStore()
const stratagemsStore = useStratagemsStore()

onUnmounted(() => {
  gameStore.stopTimer()
})

watch(() => gameStore.gameStatus, (newStatus) => {
  if (newStatus === 'playing') {
    gameStore.startTimer()
  }
})

const loadNewStratagem = () => {
  const newStratagem = stratagemsStore.getRandomStratagem()
  gameStore.setCurrentStratagem(newStratagem)
  gameStore.gameStatus = 'playing'
  gameStore.playerInput = []
  gameStore.wrongInput = false
}

const handleInput = (direction) => {
  // Не обрабатываем ввод если game over
  if (gameStore.gameStatus === 'gameover') return
  
  gameStore.addInput(direction)
  
  if (gameStore.gameStatus === 'success') {
    setTimeout(loadNewStratagem, 50)
  }
}

const returnToMenu = () => {
  gameStore.returnToMenu()
}
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  color: white;
  position: relative;
  min-height: 500px;
}

.success-message {
  color: #4caf50;
  font-size: 24px;
  animation: pulse 1s;
  text-align: center;
}

.fail-message {
  color: #f44336;
  font-size: 24px;
  animation: pulse 1s;
}

.time-bonus {
  font-size: 16px;
  color: #8bc34a;
  margin-top: 5px;
}

.gameover-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s;
}

.gameover-content {
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  border: 3px solid #f44336;
  box-shadow: 0 0 30px rgba(244, 67, 54, 0.5);
  animation: slideIn 0.5s;
}

.gameover-content h1 {
  color: #f44336;
  font-size: 48px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
}

.final-score {
  margin: 30px 0;
  font-size: 20px;
}

.final-score p {
  margin: 10px 0;
  color: #fff;
}

.menu-button {
  padding: 15px 30px;
  font-size: 20px;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.menu-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>