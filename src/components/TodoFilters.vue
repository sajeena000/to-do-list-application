<script setup>
defineProps({
  currentFilter: String
})

defineEmits(['set-filter'])
</script>

<template>
  <div class="filters-container">
    <button 
      @click="$emit('set-filter', 'all')" 
      :class="{ active: currentFilter === 'all' }"
    >
      All
    </button>
    <button 
      @click="$emit('set-filter', 'active')" 
      :class="{ active: currentFilter === 'active' }"
    >
      Active
    </button>
    <button 
      @click="$emit('set-filter', 'completed')" 
      :class="{ active: currentFilter === 'completed' }"
    >
      Completed
    </button>
  </div>
</template>

<style scoped>
.filters-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0 2rem 1rem;
}

button {
  background: transparent;
  border: 1px solid #e0e0e0;
  padding: 8px 16px;
  border-radius: 12px;
  font-family: inherit;
  color: #888;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

button:hover {
  background: #fdfdfd;
  color: #ff9a9e;
  border-color: #ff9a9e;
}

button.active {
  background: #6a82fb;
  color: white;
  border-color: #6a82fb;
  box-shadow: 0 4px 10px rgba(106, 130, 251, 0.3);
}
</style>