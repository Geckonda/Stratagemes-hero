<template>
  <div class="score-board">
    <div class="score">Счет: {{ score }}</div>
    <div class="mistakes">Ошибки: {{ mistakes }}</div>
    <div class="combo">Комбо: x{{ combo }}</div>
  </div>
</template>

<script setup>
defineProps({
  score: Number,
  mistakes: Number,
  combo: Number
})
</script>

<style scoped>
.score-board {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  color: white;
  margin-top: 20px;
}

.score-board div {
  margin: 5px 0;
  font-size: 18px;
}

.combo {
  color: #ff9800;
}
</style>