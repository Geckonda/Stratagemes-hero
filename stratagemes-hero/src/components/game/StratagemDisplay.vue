<template>
  <div class="stratagem-display" v-if="stratagem">
    <div class="stratagem-header">
      <StratagemIcon 
        :icon-file="stratagem.icon" 
        :stratagem-name="stratagem.name"
        large
      />
      <h2>{{ stratagem.name }}</h2>
    </div>
    
    <div class="code-display">
      <div 
        v-for="(direction, index) in stratagem.code" 
        :key="index"
        class="code-cell"
        :class="{
          'entered': index < playerInput.length,
          'current': index === playerInput.length && !wrongInput,
          'wrong-current': index === playerInput.length && wrongInput
        }"
      >
        <DirectionArrow 
          :direction="direction"
          :entered="index < playerInput.length"
          :current="index === playerInput.length && !wrongInput"
          :wrong="index === playerInput.length && wrongInput"
          :correct="playerInput[index] === direction"
        />
      </div>
    </div>
    
    <div class="difficulty-badge" :class="'diff-' + stratagem.difficulty">
      Сложность: {{ '★'.repeat(stratagem.difficulty) }}
    </div>
    
  </div>
</template>

<script setup>
import StratagemIcon from './StratagemIcon.vue'
import DirectionArrow from './DirectionArrow.vue'

defineProps({
  stratagem: Object,
  playerInput: Array,
  inputProgress: Number,
  wrongInput: Boolean
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

.code-display {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
}


.difficulty-badge {
  margin: 15px 0;
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.7);
  font-size: 14px;
}

.diff-1 { color: #4caf50; }
.diff-2 { color: #8bc34a; }
.diff-3 { color: #ffc107; }
.diff-4 { color: #ff9800; }
.diff-5 { color: #f44336; }

.input-progress-bar {
  width: 100%;
  max-width: 400px;
  height: 6px;
  background: #333;
  border-radius: 3px;
  overflow: hidden;
  margin: 20px auto;
}

.input-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s;
}

.wrong-feedback {
  color: #f44336;
  font-size: 18px;
  margin-top: 15px;
  animation: fadeIn 0.3s;
  font-weight: bold;
}

@keyframes shake {
  0%, 100% { transform: scale(1.1) translateX(0); }
  25% { transform: scale(1.1) translateX(-5px); }
  75% { transform: scale(1.1) translateX(5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>