<template>
  <div 
    class="arrow-wrapper"
    :class="{
      'entered': entered && !wrong,
      'current': current,
      'wrong': wrong
    }"
  >
    <div 
      class="arrow"
      :style="rotationStyle"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  direction: {
    type: String,
    required: true
  },
  entered: Boolean,
  current: Boolean,
  wrong: Boolean,
  correct: Boolean
})

const rotationStyle = computed(() => {
  let rotation = 0
  
  switch (props.direction) {
    case '⬆️': rotation = -90; break
    case '⬇️': rotation = 90; break
    case '⬅️': rotation = 180; break
    case '➡️': rotation = 0; break
  }
  
  return {
    transform: `rotate(${rotation}deg)`
  }
})

// Определяем цвета для разных состояний
const arrowColor = computed(() => {
  if (props.wrong) return '#ff4444'      // красный для ошибки
  if (props.entered) return '#f5f684'    // золотой для нажатых
  return '#FEF4F4'                        // белый по умолчанию
})
</script>

<style scoped>
.arrow-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent; /* Прозрачный фон */
}

.arrow {
  width: 100%;
  height: 100%;
  background-color: v-bind(arrowColor); /* Цвет стрелки из computed */
  transition: background-color 0.2s ease, transform 0.2s ease;
  
  /* Маска формирует форму стрелки из SVG */
  mask: url('/src/assets/icons/arrow.svg') no-repeat center / contain;
  -webkit-mask: url('/src/assets/icons/arrow.svg') no-repeat center / contain;
}

.arrow-wrapper.current .arrow {
  transform: scale(1.1);
}

.arrow-wrapper.wrong .arrow {
  animation: wrongFlash 0.3s ease;
}

@keyframes wrongFlash {
  0%, 100% { background-color: #ff4444; }
  50% { background-color: #ffffff; }
}
</style>