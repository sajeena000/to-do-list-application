import { ref, computed, watch, onMounted } from 'vue'

export function useTodos() {
  const todos = ref([])
  const currentFilter = ref('all')

  onMounted(() => {
    const saved = localStorage.getItem('cute-todos')
    if (saved) {
      todos.value = JSON.parse(saved)
    }
  })

  watch(todos, (newVal) => {
    localStorage.setItem('cute-todos', JSON.stringify(newVal))
  }, { deep: true })

  const filteredTodos = computed(() => {
    if (currentFilter.value === 'active') {
      return todos.value.filter(t => !t.done)
    }
    
    if (currentFilter.value === 'completed') {
      return todos.value.filter(t => t.done)
    }

    return [...todos.value].sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
  })

  const totalCount = computed(() => todos.value.length)
  const activeCount = computed(() => todos.value.filter(t => !t.done).length)
  const completedCount = computed(() => todos.value.filter(t => t.done).length)

  const addTodo = (text, priority = 'low', dueDate = '') => {
    todos.value.push({
      id: Date.now(),
      text,
      priority, 
      dueDate, 
      done: false
    })
  }

  const updateTodo = (id, newText) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo && newText.trim()) {
      todo.text = newText
    }
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const setFilter = (filter) => {
    currentFilter.value = filter
  }
  
  const clearCompleted = () => {
    todos.value = todos.value.filter(t => !t.done)
  }
  const clearAll = () => {
    todos.value = []
  }
  const progressPercentage = computed(() => {
    if (todos.value.length === 0) return 0
    return Math.round((todos.value.filter(t => t.done).length / todos.value.length) * 100)
  })

    return {
    progressPercentage,
    todos, 
    currentFilter,
    filteredTodos,
    totalCount,
    activeCount,
    completedCount,
    addTodo,
    updateTodo, 
    toggleTodo,
    removeTodo,
    setFilter,
    clearCompleted,
    clearAll
  }
}