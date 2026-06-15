import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'


// Register plugins
Alpine.plugin(persist)
Alpine.plugin(focus)


const API_URL = 'http://localhost:8000/api/v1/todos'


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
            // {
            //     id: uuidv4(),
            //     task: 'ride a bike',
            //     isCompleted: false,
            //     createdAt: "2026-05-01T10:00:00Z"
            // },
            // {
            //     id: uuidv4(),
            //     task: 'go to the gym',
            //     isCompleted: true,
            //     createdAt: "2026-05-02T12:00:00Z"
            // }
        ],


        isLoading: false,
        error: null,        
        curFilter: FILTERS.all,


        // Computed properties
        get filteredTodos() {
            if (this.curFilter === FILTERS.active) {
                return this.todos.filter(this.curFilter)
            }
            
            else if (this.curFilter === FILTERS.inactive) {
                return this.todos.filter(this.curFilter)
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
        async fetchTodos() {
            this.isLoading = true
            this.error = null

            try {
                const res = await axios.get(API_URL)
                const data = res.data
                console.log('Axios response.data:', data)
                console.log('Is array?', Array.isArray(data))

                // Handle both array and object responses
                if (Array.isArray(data)) {
                    this.todos = data
                } else if (data.todos && Array.isArray(data.todos)) {
                    this.todos = data.todos
                } else {
                    this.todos = []
                }

            } catch (err) {
                this.error = 'Failed to fetch todos'
                console.log('Fetch error:', err)
                this.todos = []
                
            } finally {
                this.isLoading = false
                console.log('fetched todos: ', this.todos)
            }
        },


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
            this.curFilter = filter
        }
    })
})


// ✅ EXPOSE ALPINE TO WINDOW FOR DEV TOOLS
window.Alpine = Alpine

// Start Alpine
Alpine.start()
