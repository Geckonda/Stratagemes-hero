<template>
  <div class="timer-container">
    
    <!-- Прогресс-бар времени -->
    <div class="timer-progress-bar">
      <div 
        class="timer-progress-fill" 
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


.timer-progress-bar {
  width: 100%;
  height: 20px;
  background-color: #333;
  overflow: hidden;
  border: 2px solid #4a4a4a;
}

.timer-progress-fill {
  height: 100%;
  background: #f5f684;
  transition: width 0.3s ease;
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