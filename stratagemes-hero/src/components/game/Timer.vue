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
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import { useGameStore } from '@/stores/gameStore'

    const store = useGameStore()

    const visualTimeLeft = ref(store.timeLeft)
    let rafId = null

    const update = () => {
    if (store.timerEndsAt) {
        const remaining =
        (store.timerEndsAt - performance.now()) / 1000

        visualTimeLeft.value = Math.max(remaining, 0)
    }

    rafId = requestAnimationFrame(update)
    }

    onMounted(() => {
    update()
    })

    onUnmounted(() => {
    cancelAnimationFrame(rafId)
    })

    const progress = computed(() => {
    return (visualTimeLeft.value / store.maxTime) * 100
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
  background: var(--main-accent);
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