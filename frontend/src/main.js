function todoApp() {
    return {
        todos: [
            {
                id: '879a109f-f243-496b-81c5-f3107c53302f',
                task: 'Learn JavaScript',
                is_completed: false,
                created_at: "2026-05-01T10:00:00Z"
            },
        ],
        newTodoTask: '',
        loading: false,
        errorMessage: '',
        editingTodoId: null,
        editTodoText: '',
    }
}


// console.log('')