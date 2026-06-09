import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import { v4 as uuidv4 } from 'uuid'


// Register the plugins
Alpine.plugin(persist)
Alpine.plugin(focus)


// API Configuration
// const API_BASE_URL = 'http://localhost:8000/api/v1/todos/'
