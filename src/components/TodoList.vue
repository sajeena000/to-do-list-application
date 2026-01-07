<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: Array
})

defineEmits(['toggle-todo', 'remove-todo', 'update-todo'])
</script>

<template>
  <div class="list-container">
    <TransitionGroup name="list" tag="ul" class="todo-list">
      <TodoItem 
        v-for="todo in todos" 
        :key="todo.id" 
        :todo="todo"
        @toggle="(id) => $emit('toggle-todo', id)"
        @remove="(id) => $emit('remove-todo', id)"
        @update="(id, newText) => $emit('update-todo', id, newText)"
      />
    </TransitionGroup>
    
    <div v-if="todos.length === 0" class="empty-state">
      <p>No todos to display</p>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  padding: 1rem 3rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative; 
}

.todo-list {
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  margin: auto;
  color: #adb5bd;
  font-style: italic;
  font-size: 1.2rem;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute; 
  width: 100%;
}

.list-container::-webkit-scrollbar { width: 8px; }
.list-container::-webkit-scrollbar-track { background: #fff0f5; }
.list-container::-webkit-scrollbar-thumb {
  background-color: #ffb3d9;
  border-radius: 10px;
  border: 2px solid #fff0f5;
}
.list-container::-webkit-scrollbar-thumb:hover { background-color: #ff9a9e; }
</style>