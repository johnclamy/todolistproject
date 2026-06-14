import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import { v4 as uuidv4 } from 'uuid'


// Register plugins
Alpine.plugin(persist)
Alpine.plugin(focus)


// const API_URL = 'http://localhost:3000/api/todos/'


// Filters for todo list (used in the UI to filter displayed todos)
const FILTERS = {
    all: () => true,
    active: (todo) => !todo.isCompleted,
    inactive: (todo) => todo.isCompleted
}


// Store-based approach (Recommended)
document.addEventListener('alpine:init', () => {
    Alpine.store('todoStore', {
        todos: [
            // Example todos (replaced by the fetch api)
            {
                id: uuidv4(),
                task: 'ride a bike',
                isCompleted: false,
                createdAt: "2026-05-01T10:00:00Z"
            },
            {
                id: uuidv4(),
                task: 'go to the gym',
                isCompleted: true,
                createdAt: "2026-05-02T12:00:00Z"
            }
        ],


        isLoading: false,
        error: null,        
        filter: FILTERS.all,


        // Computed properties
        get filteredTodos() {
            if (this.filter === FILTERS.active) {
                return this.todos.filter(this.filter)
            }
            
            else if (this.filter === FILTERS.inactive) {
                return this.todos.filter(this.filter)
            }

            return this.todos
        },

        get activeCount() {
            return this.todos.filter(FILTERS.active).length
        },

        get completedCount() {
            return this.todos.filter(FILTERS.inactive).length
        },


        // API methods
        async fetchTodos() {},


        async addTodo(task) {
            if (!task.trim()) {
                this.error = 'Task cannot be empty'
                return
            }

            const newTodo = {
                id: Date.now(),
                task: task.trim(),
                isCompleted: false,
                createdAt: new Date().toISOString()
            }

            this.todos.push(newTodo)
        },


        async toggleTodo(todo) {
            const updatedTodo = {
                ...todo,
                isCompleted: !todo.isCompleted
            }

            this.todos = this.todos.map(t => t.id === todo.id ? updatedTodo : t)
        },

        async deleteTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        },


        async deleteCompleted() {
            this.todos = this.todos.filter(todo => !todo.isCompleted)
        },

        async deleteAll() {
            this.todos = []
        },


        setFilter(filter) {
            this.filter = filter
        }
    })
})


// ✅ EXPOSE ALPINE TO WINDOW FOR DEV TOOLS
window.Alpine = Alpine

// Start Alpine
Alpine.start()
