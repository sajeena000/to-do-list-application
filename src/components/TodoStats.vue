<script setup>
import Swal from 'sweetalert2' 

const props = defineProps({
  totalCount: Number,
  activeCount: Number,
  completedCount: Number
})

const emit = defineEmits(['clear-completed', 'clear-all'])

const handleClearAll = async () => {
  if (props.totalCount === 0) return 

  const result = await Swal.fire({
    title: 'Delete Everything?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff9a9e',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Yes, delete it!',
    background: '#fff0f5',
    color: '#555'
  })

  if (result.isConfirmed) {
    emit('clear-all')
    Swal.fire({
      title: 'Deleted!',
      text: 'Your list has been cleared.',
      icon: 'success',
      confirmButtonColor: '#ff9a9e',
      background: '#fff0f5'
    })
  }
}
</script>

<template>
  <div class="stats-container">
    <div class="counts">
      <span><strong>Total:</strong> {{ totalCount }}</span>
      <span><strong>Active:</strong> {{ activeCount }}</span>
      <span><strong>Done:</strong> {{ completedCount }}</span>
    </div>

    <div class="actions">
      <button 
        v-if="completedCount > 0" 
        @click="$emit('clear-completed')" 
        class="btn-text"
      >
        Clear Done
      </button>

      <button 
        v-if="totalCount > 0" 
        @click="handleClearAll" 
        class="btn-danger"
      >
        Reset All 🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  background: #fafafa;
  padding: 15px 2rem;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border-top: 1px solid #f0f0f0;
  font-size: 0.9rem;
  color: #888;
}

.counts {
  display: flex;
  gap: 15px;
}

.actions {
  display: flex;
  gap: 10px;
}

strong {
  color: #555;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.btn-text {
  color: #888;
  text-decoration: underline;
}
.btn-text:hover {
  color: #555;
}

.btn-danger {
  color: #ff6b6b;
  font-weight: 600;
  background: #fff0f0;
  padding: 5px 10px;
  border-radius: 8px;
}
.btn-danger:hover {
  background: #ffe5e5;
  color: #d32f2f;
}

@media (max-width: 600px) {
  .stats-container {
    flex-direction: column; 
    gap: 15px;
    padding: 15px 1rem;
    height: auto;
  }

  .counts {
    width: 100%;
    justify-content: space-around; 
    font-size: 0.8rem;
  }

  .actions {
    width: 100%;
    justify-content: center; 
  }
}
</style>