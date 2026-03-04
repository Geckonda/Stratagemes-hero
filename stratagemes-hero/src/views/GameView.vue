<template>
  <GameLayout>
    
    <template #sidebar>
    <h3 class="sidebar-title">Стратагемы</h3>
    <div class="filters-wrapper">
        <button class="filters-toggle" @click="toggleFilters">
            <span>Фильтры</span>
            <span class="arrow" :class="{ open: filtersOpen }">▾</span>
        </button>

        <transition name="collapse">
            <div v-show="filtersOpen" class="filters">
            <input
                type="text"
                placeholder="Поиск..."
                v-model="stratagemsStore.searchQuery"
                class="search-input"
            />

            <div class="difficulty-filters">
                <label v-for="level in 5" :key="level">
                <input
                    type="checkbox"
                    :value="level"
                    v-model="stratagemsStore.difficultyFilter"
                />
                {{ level +'★' }}
                </label>
            </div>

            <button class="reset-button" @click="stratagemsStore.resetFilters()">
                Сброс
            </button>
            </div>
        </transition>
        <transition name="fade-slide">
            <button
                v-if="hasSelected"
                class="btn btn-danger btn-cancel"
                @click="stratagemsStore.selectedStratagems = []"
            >
                Отмена выбранных
            </button>
        </transition>
    </div>
      <div class="sidebar-top">
        <StratagemList 
        :stratagems="stratagemsStore.allStratagems"
        :unlocked="stratagemsStore.unlockedStratagems"
        />
      </div>
      <ScoreBoard 
        :score="gameStore.score"
        :mistakes="gameStore.mistakes"
        :combo="gameStore.combo"
      />
     
    </template>
    
    <template #main>
       <div class="sound-control">
        <button @click="toggleSound" class="sound-button">
          {{ soundEnabled ? '🔊' : '🔇' }}
        </button>
      </div>
      <!-- Показываем GameBoard только если есть текущая стратагема и игра не в idle -->
      <GameBoard v-if="gameStore.currentStratagem && gameStore.gameStatus !== 'idle'" />
      
      <!-- Главный экран (кнопка старт) -->
      <div v-else class="start-screen">
        <h1 class="game-title">STRATAGEMES HERO</h1>
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
import { useSound } from '@/composables/soundManager'
import { useGlobalInput } from '@/composables/useGlobalInput'
import { watch, ref, computed } from 'vue'

const gameStore = useGameStore()
const stratagemsStore = useStratagemsStore()
const { soundEnabled, toggleSound } = useSound()

let startedByKey = false

useGlobalInput({
  Space: () => {
    if (gameStore.gameStatus === 'idle') {
      startGame()
    }
  }
})

const startGame = () => {
  const firstStratagem = stratagemsStore.getRandomStratagem()
  gameStore.setCurrentStratagem(firstStratagem)
  gameStore.startGame()
}

const filtersOpen = ref(false)

const toggleFilters = () => {
  filtersOpen.value = !filtersOpen.value
}

watch(
  () => [
    stratagemsStore.searchQuery,
    stratagemsStore.difficultyFilter.length
  ],
  ([query, diffLen]) => {
    if (query || diffLen > 0) {
      filtersOpen.value = true
    }
  }
)
const hasSelected = computed(() =>
  stratagemsStore.selectedStratagems.length > 0
)
</script>

<style scoped>
.main-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sidebar-top {
  flex: 1 1 auto;
  overflow: hidden;
  min-height: 0 ;
}
.sidebar-title{
    text-align: center;
    color: var(--main-accent);
    font-size: 24px;
    margin:0;
    padding: 20px 0;
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

.filters-wrapper {
  padding: 0 15px;
  margin-bottom: 20px;
}
.difficulty-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.difficulty-filters label {
  cursor: pointer;
  font-size: 12px;
}
/* Кнопка */
.filters-toggle {
  width: 100%;
  background: var(--secondary-background);
  border: 1px solid #4a4a4a;
  color: var(--main-accent);
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
  transition: all 0.2s;
}

.filters-toggle:hover {
  border-color: var(--main-accent);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

/* Стрелка */
.arrow {
  transition: transform 0.25s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

/* Контейнер фильтров */
.filters {
  margin-top: 10px;
  padding: 12px;
  background: var(--primary-background);
  border-radius: 8px;
  border: 1px solid #4a4a4a;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Анимация */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.25s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.search-input {
  background: #0f0f0f;
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  padding: 10px 12px;

  color: white;
  font-size: 14px;

  outline: none;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: #777;
}

.search-input:focus {
  border-color: var(--main-accent);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
  background: #121212;
}
.difficulty-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Контейнер */
.difficulty-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;
  user-select: none;

  padding: 6px 10px;
  border-radius: 6px;
  background: #111;
  border: 1px solid #333;

  transition: all 0.2s;
  font-size: 12px;
}

/* Скрываем нативный input */
.difficulty-checkbox input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Квадрат */
.checkmark {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1px solid #666;
  background: #000;
  transition: all 0.2s;
}

/* Звёзды */
.stars {
  color: #888;
  letter-spacing: 1px;
}

/* Hover */
.difficulty-checkbox:hover {
  border-color: var(--main-accent);
}

/* Checked */
.difficulty-checkbox input:checked ~ .checkmark {
  background: var(--main-accent);
  border-color: var(--main-accent);
  box-shadow: 0 0 6px rgba(255, 215, 0, 0.6);
}

.difficulty-checkbox input:checked ~ .stars {
  color: var(--main-accent);
}
.reset-button {
  background: linear-gradient(135deg, #1a1a1a, #111);
  border: 1px solid #4a4a4a;
  border-radius: 8px;

  color: #ccc;
  font-weight: bold;
  padding: 8px 12px;
  cursor: pointer;

  transition: all 0.2s;
}

.reset-button:hover {
  color: #fff;
  border-color: #f44336;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.4);
}

.reset-button:active {
  transform: scale(0.96);
}
.filters-toggle {
  background: linear-gradient(135deg, #1c1c1c, #101010);
}

.filters-toggle:active {
  transform: scale(0.98);
}
:deep(.fade-slide-enter-active),
:deep(.fade-slide-leave-active) {
  transition: all 0.25s ease;
}

:deep(.fade-slide-enter-from),
:deep(.fade-slide-leave-to) {
  opacity: 0;
  transform: translateY(-5px);
}
/* В компоненте */
.btn-cancel {
  margin-top: 12px;
  width: 100%;
}
.game-title {
  font-size: 48px;
  margin-bottom: 10px;
  color: var(--main-accent);
  text-shadow: var(--light-shine);
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
}

.start-button:hover {
  transform: scale(1.1);
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
.sound-control {
  display: flex;
  justify-content: center;
}

.sound-button {
  background: var(--secondary-background);
  border: 2px solid #4a4a4a;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: absolute;
  top:15px;
  right: 15px;
  z-index: 10;
}

.sound-button:hover {
  border-color: var(--main-accent);
  transform: scale(1.1);
}
@keyframes glow {
  0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
  100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
}
</style>