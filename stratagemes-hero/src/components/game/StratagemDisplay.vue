<template>
  <div class="stratagem-display" v-if="stratagem">
    <div class="stratagem-header">
      <StratagemIcon 
        :icon-file="stratagem.icon" 
        :stratagem-name="stratagem.name"
        large
        :extra-large="isLargeScreen"
      />
      <h2 :class="{ 'large-screen': isLargeScreen }">{{ stratagem.name }}</h2>
    </div>
    
    <div class="code-display">
      <div 
        v-for="(direction, index) in stratagem.code" 
        :key="index"
        class="code-cell"
        :class="{
          'entered': index < playerInput.length,
          'current': index === playerInput.length && !wrongInput,
          'wrong-current': index === playerInput.length && wrongInput,
          'large-screen': isLargeScreen
        }"
      >
        <DirectionArrow 
          :direction="direction"
          :entered="index < playerInput.length"
          :current="index === playerInput.length && !wrongInput"
          :wrong="index === playerInput.length && wrongInput"
          :correct="playerInput[index] === direction"
          :large="isLargeScreen"
        />
      </div>
    </div>
    
    <div class="difficulty-badge" :class="['diff-' + stratagem.difficulty, { 'large-screen': isLargeScreen }]">
      Сложность: {{ '★'.repeat(stratagem.difficulty) }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import StratagemIcon from './StratagemIcon.vue'
import DirectionArrow from './DirectionArrow.vue'

defineProps({
  stratagem: Object,
  playerInput: Array,
  inputProgress: Number,
  wrongInput: Boolean
})

const isLargeScreen = ref(false)

const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1920
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.stratagem-display {
  color: white;
  text-align: center;
}

.stratagem-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.stratagem-header h2 {
  margin: 0;
  font-size: 28px;
}

/* Только увеличение для больших экранов */
@media screen and (min-width: 1920px) {
  .stratagem-header h2.large-screen {
    font-size: 42px;
  }
}

.code-display {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
}

.code-cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.3s;
}

/* Только увеличение для больших экранов */
@media screen and (min-width: 1920px) {
  .code-cell.large-screen {
    width: 90px;
    height: 90px;
  }
}


.difficulty-badge {
  margin: 15px 0;
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.7);
  font-size: 14px;
}

/* Только увеличение для больших экранов */
@media screen and (min-width: 1920px) {
  .difficulty-badge.large-screen {
    font-size: 20px;
    padding: 8px 20px;
  }
}

.diff-1 { color: #4caf50; }
.diff-2 { color: #8bc34a; }
.diff-3 { color: #ffc107; }
.diff-4 { color: #ff9800; }
.diff-5 { color: #f44336; }

@keyframes shake {
  0%, 100% { transform: scale(1.1) translateX(0); }
  25% { transform: scale(1.1) translateX(-5px); }
  75% { transform: scale(1.1) translateX(5px); }
}
</style>