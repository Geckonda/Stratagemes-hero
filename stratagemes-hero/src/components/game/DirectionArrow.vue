<template>
  <div 
    class="arrow-wrapper"
    :class="{
      'entered': entered && !wrong,
      'current': current,
      'wrong': wrong,
      'large': large
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
  correct: Boolean,
  large: Boolean
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

const arrowColor = computed(() => {
  if (props.wrong) return '#ff4444'
  if (props.entered) return '#f5f684'
  return '#FEF4F4'
})

const baseUrl = import.meta.env.BASE_URL

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

/* Только увеличение для больших экранов */
@media screen and (min-width: 1920px) {
  .arrow-wrapper.large {
    width: 60px;
    height: 60px;
  }
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