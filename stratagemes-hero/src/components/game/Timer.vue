<template>
  <div class="timer-container">
    <div class="timer-header">
      <span class="timer-label">Время</span>
      <span class="timer-value" :class="{ warning: timeLeft <= 3 }">{{ timeLeft }}с</span>
    </div>
    
    <!-- Прогресс-бар времени -->
    <div class="timer-progress-bar">
      <div 
        class="timer-progress-fill" 
        :class="{ 
          warning: timeLeft <= 3,
          critical: timeLeft <= 1 
        }"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  timeLeft: Number,
  maxTime: Number
})

const progress = computed(() => {
  return (props.timeLeft / props.maxTime) * 100
})
</script>

<style scoped>
.timer-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.timer-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: white;
  font-size: 18px;
}

.timer-value.warning {
  color: #ff9800;
  font-weight: bold;
  animation: pulse 1s infinite;
}

.timer-progress-bar {
  width: 100%;
  height: 20px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a4a4a;
}

.timer-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
  border-radius: 8px;
}

.timer-progress-fill.warning {
  background: linear-gradient(90deg, #ff9800, #ff5722);
}

.timer-progress-fill.critical {
  background: linear-gradient(90deg, #f44336, #d32f2f);
  animation: blink 0.5s infinite;
}

.time-warning {
  text-align: center;
  color: #ff9800;
  font-size: 16px;
  margin-top: 5px;
  font-weight: bold;
  animation: shake 0.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
</style>