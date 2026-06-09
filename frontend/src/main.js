import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import { v4 as uuidv4 } from 'uuid'


// Register the plugins
Alpine.plugin(persist)
Alpine.plugin(focus)


// API Configuration 
// const API_BASE_URL = 'http://localhost:8000/api/v1/todos/'


// Todo list filter
const todoFilter = ['all', 'active', 'completed']  


// Store-based approach (recommended for shared state across components)
document.addEventListener('alpine:init', () => {
    Alpine.store('todoStore', {
        // State
        todos: [
            {
                id: "c32d8b45-92fe-44f6-8b61-42c2107dfe87",
                task: "Go to the movies",
                is_completed: false,
                created_at: "2026-05-01T10:00:00Z",
            }
        ],

        is_loading: false,
        error: null,
        filter: todoFilter[0],

        // Filter todos based on the current filter
        get filteredTodos() {
            if (this.filter === 'active') {
                return this.todos.filter(todo => !todo.is_completed)
            } else if (this.filter === 'completed') {
                return this.todos.filter(todo => todo.is_completed)
            }
            return this.todos
        },

    })
})
