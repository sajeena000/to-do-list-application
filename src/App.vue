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
    <div class="cat-wrapper">
      <div class="cat-body">
        <div class="ear left"></div>
        <div class="ear right"></div>
        <div class="face">
          <div class="eye left"><div class="pupil"></div></div>
          <div class="eye right"><div class="pupil"></div></div>
          <div class="nose"></div>
          <div class="mouth">
            <div class="mouth-l"></div>
            <div class="mouth-r"></div>
          </div>
          <div class="blush left"></div>
          <div class="blush right"></div>
          
          <div class="whiskers left">
            <span></span><span></span>
          </div>
          <div class="whiskers right">
            <span></span><span></span>
          </div>
        </div>
        <div class="paws">
          <div class="paw left"></div>
          <div class="paw right"></div>
        </div>
      </div>
    </div>

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

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8 0%, #e0c3fc 50%, #d4f1f9 100%);
  display: flex;
  flex-direction: column; 
  align-items: center;
  padding-top: 40px; 
  padding-bottom: 40px;
  position: relative;
  overflow-y: auto;
}

.cat-wrapper {
  position: relative;
  z-index: 10;
  margin-bottom: -25px;
}

.cat-body {
  width: 140px;
  height: 90px;
  background: #ffffff;
  border-radius: 70px 70px 50px 50px;
  position: relative;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
}

.ear {
  width: 40px;
  height: 40px;
  background: #ffffff;
  position: absolute;
  top: -5px;
  border-radius: 10px 30px 0 0;
  z-index: -1;
}

.ear::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 25px;
  background: #ffc4d6;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  opacity: 0.8;
}

.ear.left {
  left: 10px;
  transform: rotate(-20deg);
}
.ear.left::after { left: 10px; }

.ear.right {
  right: 10px;
  transform: rotate(20deg) scaleX(-1);
}
.ear.right::after { left: 10px; }

.face {
  position: relative;
  top: 35px;
  height: 100%;
}

.eye {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #4a4a4a;
  border-radius: 50%;
  top: 0;
  animation: blink 4s infinite;
}

.eye .pupil {
  position: absolute;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 3px;
}

.eye.left { left: 35px; }
.eye.right { right: 35px; }

@keyframes blink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

.nose {
  position: absolute;
  width: 8px;
  height: 6px;
  background: #ff9a9e;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  top: 8px;
}

.mouth {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.mouth-l, .mouth-r {
  width: 10px;
  height: 8px;
  border-bottom: 2px solid #4a4a4a;
  border-radius: 0 0 10px 10px;
}

.blush {
  position: absolute;
  width: 16px;
  height: 8px;
  background: #ffb3d9;
  border-radius: 50%;
  top: 10px;
  opacity: 0.6;
}
.blush.left { left: 20px; }
.blush.right { right: 20px; }

.whiskers span {
  display: block;
  width: 25px;
  height: 2px;
  background: #e0e0e0;
  margin: 3px 0;
  border-radius: 2px;
}
.whiskers.left {
  position: absolute;
  left: -10px;
  top: 5px;
  transform: rotate(5deg);
}
.whiskers.right {
  position: absolute;
  right: -10px;
  top: 5px;
  transform: rotate(-5deg);
}

.paws {
  position: absolute;
  bottom: -12px;
  width: 100%;
}

.paw {
  position: absolute;
  width: 28px;
  height: 24px;
  background: #fff;
  border-radius: 15px 15px 10px 10px;
  bottom: 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
}

.paw.left { left: 30px; }
.paw.right { right: 30px; }

.container {
  width: 90%;
  max-width: 900px;
  height: 80vh;
  min-height: 650px;
  max-height: 900px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
  overflow: hidden;
  border: 4px solid #ffb3d9;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
}

.app::before {
  content: '⭐';
  position: absolute;
  font-size: 2rem;
  top: 10%;
  left: 10%;
  animation: twinkle 3s infinite;
}

.app::after {
  content: '⭐';
  position: absolute;
  font-size: 2rem;
  bottom: 15%;
  right: 12%;
  animation: twinkle 4s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.header {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fbc2eb 100%);
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.cloud {
  position: absolute;
  font-size: 2rem;
  animation: float 6s ease-in-out infinite;
}
.cloud-1 { top: 10px; left: 20px; animation-delay: 0s; }
.cloud-2 { top: 15px; right: 30px; animation-delay: 3s; }

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.title {
  margin: 0 0 0.5rem 0;
  font-size: 2.8rem;
  font-weight: 800;
  color: #ff1493;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.subtitle {
  margin: 0;
  font-size: 1.2rem;
  color: #ff69b4;
  font-weight: 600;
}
</style>