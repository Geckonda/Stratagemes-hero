<template>
  <GameLayout>
    <template #sidebar>
      <StratagemList 
        :stratagems="stratagemsStore.allStratagems"
        :unlocked="stratagemsStore.unlockedStratagems"
      />
      <ScoreBoard 
        :score="gameStore.score"
        :mistakes="gameStore.mistakes"
        :combo="gameStore.combo"
      />
    </template>
    
    <template #main>
      <!-- Показываем GameBoard только если есть текущая стратагема и игра не в idle -->
      <GameBoard v-if="gameStore.currentStratagem && gameStore.gameStatus !== 'idle'" />
      
      <!-- Главный экран (кнопка старт) -->
      <div v-else class="start-screen">
        <h1 class="game-title">STRATAGEM HERO</h1>
        <p class="game-subtitle">Вводи комбинации как в Helldivers 2!</p>
        
        <div class="stats-preview" v-if="gameStore.score > 0">
          <h2>Последняя игра:</h2>
          <p>Счет: {{ gameStore.score }}</p>
        </div>
        
        <button @click="startGame" class="menu-button start-button">
          Start
        </button>
        
      </div>
    </template>
  </GameLayout>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useStratagemsStore } from '@/stores/stratagemsStore'
import GameLayout from '@/components/layout/GameLayout.vue'
import GameBoard from '@/components/game/GameBoard.vue'
import StratagemList from '@/components/ui/StratagemList.vue'
import ScoreBoard from '@/components/ui/ScoreBoard.vue'

const gameStore = useGameStore()
const stratagemsStore = useStratagemsStore()

const startGame = () => {
  const firstStratagem = stratagemsStore.getRandomStratagem()
  gameStore.setCurrentStratagem(firstStratagem)
  gameStore.startGame()
}
</script>

<style scoped>
.main-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.start-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: white;
}

.game-title {
  font-size: 48px;
  margin-bottom: 10px;
  color: #f5f684;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  animation: glow 2s ease-in-out infinite;
}

.game-subtitle {
  font-size: 18px;
  color: #888;
  margin-bottom: 40px;
}

.stats-preview {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 1px solid #4a4a4a;
}

.stats-preview h2 {
  color: #ffd700;
  margin-bottom: 10px;
}

.stats-preview p {
  margin: 5px 0;
  color: #fff;
}

.start-button {
  padding: 20px 60px;
  font-size: 32px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
  margin-bottom: 40px;
  box-shadow: 0 0 30px rgba(76, 175, 80, 0.3);
}

.start-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 50px rgba(76, 175, 80, 0.5);
}

.instructions {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #4a4a4a;
}

.instructions h3 {
  color: #ffd700;
  margin-bottom: 15px;
}

.instructions p {
  margin: 10px 0;
  color: #ccc;
  font-size: 16px;
}

@keyframes glow {
  0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
  100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
}
</style>