<script setup>
import { useTodos } from './composables/useTodos'
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import TodoStats from './components/TodoStats.vue'

const {
  currentFilter,
  filteredTodos,
  totalCount,
  activeCount,
  completedCount,
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  setFilter,
  clearCompleted
} = useTodos()
</script>

<template>
  <div class="app">


    <div class="container">
      <div class="header">
        <div class="cloud cloud-1">☁️</div>
        <div class="cloud cloud-2">☁️</div>
        <h1 class="title">🌸 Todo List 🌸</h1>
        <p class="subtitle">Let's make today magical! ✨</p>
      </div>
      
      <TodoInput @add-todo="addTodo" />
      
      <TodoFilters 
        :current-filter="currentFilter"
        @set-filter="setFilter"
      />
      
      <TodoList 
        :todos="filteredTodos"
        @toggle-todo="toggleTodo"
        @remove-todo="removeTodo"
        @update-todo="updateTodo"
      />
      
      <TodoStats 
        :total-count="totalCount"
        :active-count="activeCount"
        :completed-count="completedCount"
        @clear-completed="clearCompleted"
      />
    </div>
  </div>
</template>

