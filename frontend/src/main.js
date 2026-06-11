import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'


// Register plugins
Alpine.plugin(persist)
Alpine.plugin(focus)


// API URL (adjust as needed)
// const API_URL = 'http://localhost:3000/api/todos/'


// Filters for todo list (used in the UI to filter displayed todos)
const FILTERS = {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed
}


// Store-based approach (Recommended)
document.addEventListener('alpine:init', () => {
    Alpine.store('todoStore', { 
        todos: [
            {
                id: 1,
                task: 'ride a bike',
                isCompleted: false,
                createdAt: "2026-05-01T10:00:00Z"
            },
            {
                id: 2,
                task: 'go to the gym',
                isCompleted: true,
                createdAt: "2026-05-02T12:00:00Z"
            }
        ],
        
        isLoading: false,
        error: null,
        filter: FILTERS.all,
    })
})


// ✅ EXPOSE ALPINE TO WINDOW FOR DEV TOOLS
window.Alpine = Alpine

// Start Alpine
Alpine.start()