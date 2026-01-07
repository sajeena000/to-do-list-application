<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])
const newTodo = ref('')
const priority = ref('low')
const dueDate = ref('') 

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    emit('add-todo', newTodo.value, priority.value, dueDate.value)
    
    newTodo.value = ''
    priority.value = 'low'
    dueDate.value = ''
  }
}
</script>

<template>
  <div class="input-group">
    <input 
      v-model="newTodo" 
      @keyup.enter="handleSubmit" 
      placeholder="What needs to be done?" 
      class="cute-input"
    />
    
    <input 
      type="date" 
      v-model="dueDate" 
      class="date-select"
      title="Set Due Date"
    />

    <select v-model="priority" class="priority-select" title="Set Priority">
      <option value="low">🟢 Low</option>
      <option value="medium">🟡 Med</option>
      <option value="high">🔴 High</option>
    </select>

    <button @click="handleSubmit" class="cute-btn">Add</button>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  padding: 1.5rem 2rem;
  gap: 10px;
  align-items: center;
}

.cute-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #ffdde1;
  border-radius: 15px;
  font-family: inherit;
  font-size: 1rem;
  color: #666;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
}

.cute-input:focus {
  border-color: #ff9a9e;
  box-shadow: 0 0 10px rgba(255, 154, 158, 0.3);
}

.priority-select, .date-select {
  padding: 0 10px;
  height: 44px; 
  border: 2px solid #ffdde1;
  border-radius: 15px;
  background: white;
  color: #666;
  font-family: inherit;
  cursor: pointer;
  outline: none;
}

.date-select {
  font-size: 0.9rem;
  width: 130px;
}

.priority-select:focus, .date-select:focus {
  border-color: #ff9a9e;
}

.cute-btn {
  background-color: #6a82fb;
  color: white;
  border: none;
  padding: 0 25px;
  height: 44px; 
  border-radius: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cute-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 130, 251, 0.4);
}
</style>