<template>
  <img 
    :src="iconPath" 
    :alt="stratagemName"
    class="stratagem-icon"
    :class="{ 
      small, 
      large,
      'extra-large': extraLarge 
    }"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconFile: {
    type: String,
    required: true
  },
  stratagemName: {
    type: String,
    default: 'Стратагема'
  },
  small: Boolean,
  large: Boolean,
  extraLarge: Boolean
})

const iconPath = computed(() => {
  const base = import.meta.env.PROD ? '/Stratagemes-hero' : ''
  return `${base}/icons/${props.iconFile}`
})
</script>

<style scoped>
.stratagem-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.stratagem-icon.small {
  width: 24px;
  height: 24px;
}

.stratagem-icon.large {
  width: 165px;
  height: 165px;
}

/* Только увеличение для больших экранов */
@media screen and (min-width: 1920px) {
  .stratagem-icon.large.extra-large {
    width: 172px;
    height: 172px;
  }
}
</style>