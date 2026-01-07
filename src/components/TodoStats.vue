<script setup>
defineProps({
  totalCount: Number,
  activeCount: Number,
  completedCount: Number
})
</script>

<template>
  <div class="stats-bar">
    <span><strong>Total:</strong> {{ totalCount }}</span>
    <span><strong>Active:</strong> {{ activeCount }}</span>
    <span><strong>Completed:</strong> {{ completedCount }}</span>
  </div>
</template>

<style scoped>
.stats-bar {
  background: #fafafa;
  padding: 15px 2rem;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  color: #888;
  font-size: 0.9rem;
  border-top: 1px solid #f0f0f0;
}

strong {
  color: #555;
}
</style> 