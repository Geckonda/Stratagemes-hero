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
      :style="[rotationStyle, maskStyle]"
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

// Базовый URL для продакшена
const baseUrl = import.meta.env.BASE_URL

// Стиль для маски с правильным путем
const maskStyle = computed(() => ({
  backgroundColor: arrowColor.value,
  mask: `url(${baseUrl}icons/arrow.svg) no-repeat center / contain`,
  WebkitMask: `url(${baseUrl}icons/arrow.svg) no-repeat center / contain`
}))
</script>

<style scoped>
.arrow-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.arrow {
  width: 100%;
  height: 100%;
  transition: background-color 0.2s ease, transform 0.2s ease;
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