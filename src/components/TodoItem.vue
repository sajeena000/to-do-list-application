<script setup>
import { ref, nextTick } from 'vue'
import confetti from 'canvas-confetti'
import Swal from 'sweetalert2' 

const props = defineProps({
  todo: Object
})

const emit = defineEmits(['toggle', 'remove', 'update'])

const isEditing = ref(false)
const editInput = ref(null)
const editText = ref('')

const handleToggle = async () => {
  const isCompleting = !props.todo.done

  const result = await Swal.fire({
    title: isCompleting ? 'Task Completed? 🌸' : 'Not finished yet?',
    text: isCompleting 
      ? "Yay! Did you finish this task?" 
      : "Do you want to mark this as incomplete?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',     
    cancelButtonText: 'No',

    confirmButtonColor: '#ff9a9e', 
    cancelButtonColor: '#d33',
    background: '#fff0f5',    
    color: '#555',
    iconColor: '#ffb3d9',
    width: 400,
    padding: '2em',
    backdrop: `
      rgba(255,192,203,0.2)
    `
  })

  if (!result.isConfirmed) return

  emit('toggle', props.todo.id)

  if (isCompleting) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff9a9e', '#fecfef', '#a18cd1', '#fbc2eb']
    })
  }
}

const startEdit = () => {
  if (props.todo.done) return 
  isEditing.value = true
  editText.value = props.todo.text
  nextTick(() => editInput.value.focus())
}

const finishEdit = () => {
  isEditing.value = false
  if (editText.value.trim()) {
    emit('update', props.todo.id, editText.value)
  }
}
const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = props.todo.text
}
</script>

<template>
  <li :class="{ 'item-completed': todo.done, 'is-editing': isEditing }">
    <div v-if="isEditing" class="edit-mode">
      <input 
        ref="editInput"
        v-model="editText"
        @blur="finishEdit"
        @keyup.enter="finishEdit"
        @keyup.escape="cancelEdit"
        class="edit-input"
      />
    </div>

    <div v-else class="item-content">
      <div class="checkbox" @click.stop="handleToggle">
        <span v-if="todo.done">🌸</span>
      </div>
      
      <span class="priority-badge" :class="todo.priority">
        {{ todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢' }}
      </span>

      <span class="text" @dblclick="startEdit">{{ todo.text }}</span>

      <span v-if="todo.dueDate" class="due-date">
        📅 {{ formatDate(todo.dueDate) }}
      </span>
    </div>

    <div class="actions">
      <button v-if="!isEditing && !todo.done" class="icon-btn edit-btn" @click="startEdit">✏️</button>
      <button class="icon-btn delete-btn" @click.stop="$emit('remove', todo.id)">×</button>
    </div>
  </li>
</template>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
  border-bottom: 1px solid #f0f0f0;
  min-height: 70px;
  background: white;
}
.priority-badge {
  font-size: 0.8rem;
  margin-right: 8px;
  padding: 2px 6px;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.priority-badge.high { background-color: #ffe5e5; }
.priority-badge.medium { background-color: #fff9c4; }
.priority-badge.low { background-color: #e8f5e9; }

.item-content {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  flex: 1;
  overflow: hidden; 
}

.checkbox {
  width: 28px;
  height: 28px;
  border: 2px solid #ffb3d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
  flex-shrink: 0;
  cursor: pointer;
}

.item-completed .checkbox {
  background-color: #ffeef8;
  border-color: #ff9a9e;
}

.text {
  color: #555;
  font-size: 1.3rem;
  transition: color 0.2s;
  word-break: break-word;
}

.item-completed .text {
  color: #d1d1d1;
  text-decoration: line-through;
}

.edit-mode { flex: 1; margin-right: 10px; }
.edit-input {
  width: 100%; padding: 8px 12px; font-size: 1.2rem;
  border: 2px solid #a18cd1; border-radius: 10px; outline: none; color: #555;
}

.actions { display: flex; gap: 5px; align-items: center; }
.icon-btn {
  background: none; border: none; cursor: pointer;
  transition: transform 0.2s; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;
}
.icon-btn:hover { transform: scale(1.2); }
.edit-btn { font-size: 1.2rem; opacity: 0.6; }
.edit-btn:hover { opacity: 1; }
.delete-btn { color: #ff9a9e; font-size: 2rem; line-height: 1; }
.delete-btn:hover { color: #ff1493; }

.due-date {
  font-size: 0.85rem;
  color: #999;
  background: #fdf0f6; 
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: auto;
  margin-right: 10px;
  white-space: nowrap;
}
</style>