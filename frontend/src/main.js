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
        currFilter: FILTERS.all,


        // Computed properties
        get filteredTodos() {
            if (this.currFilter === FILTERS.active) {
                return this.todos.filter(this.currFilter)
            }
            
            else if (this.currFilter === FILTERS.inactive) {
                return this.todos.filter(this.currFilter)
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
                // console.log('Axios response.data:', data)
                // console.log('Is array?', Array.isArray(data))

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
            const trimmedTask = task.trim()

            if (!trimmedTask) {
                this.error = 'Task cannot be empty'
                return
            }

            const newTodo = {
                id: uuidv4(),
                task: trimmedTask,
                isCompleted: false,
                createdAt: new Date().toISOString()
            }

            // this.todos.push(newTodo)
            try {
                const res = await axios.post(API_URL, newTodo)
                this.todos = [...this.todos, res.data]
            } catch (err) {
                this.error = 'Failed to add todo'
                console.log('Add todo error:', err)
            }
        },


        async toggleTodo(todo) {
            const updatedTodo = {
                ...todo,
                isCompleted: !todo.isCompleted
            }

            try {
                const res = await axios.put(`${API_URL}/${todo.id}`, updatedTodo)
                this.todos = this.todos.map(t => t.id === todo.id ? res.data : t)
            } catch (err) {
                this.error = 'Failed to update todo'
                console.log('Update todo error:', err)
            }
        },


        async deleteTodo(id) {
            try {
                await axios.delete(`${API_URL}/${id}`)
                this.todos = this.todos.filter(todo => todo.id !== id)
            } catch (err) {
                this.error = 'Failed to delete todo'
                console.log('Delete todo error:', err)
            }
        },


        async deleteCompleted() {
            this.todos = this.todos.filter(todo => !todo.isCompleted)
        },

        async deleteAll() {
            this.todos = []
        },


        setFilter(filter) {
            this.currFilter = filter
        }
    })
})


// ✅ EXPOSE ALPINE TO WINDOW FOR DEV TOOLS
window.Alpine = Alpine

// Start Alpine
Alpine.start()
