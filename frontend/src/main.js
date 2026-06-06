document.addEventListener('alpine:init', () => {
    Alpine.data('todoApp', () => ({
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
        editingTodoId: '',
        editTodoText: '',

        // Computed properties
        get completedCount() {
            return this.todos.filter(t => t.status).length;
        },

        get pendingCount() {
            return this.todos.filter(t => !t.status).length;
        },

        // Toggle todo checkbox status
        async toggleCheckbox(id) {
            const todo = this.todos.find(t => t.id === id);
            if (!todo) return;
            
            try {
                const response = await fetch(`http://localhost:8000/todos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: !todo.status })
                });
                
                if (!response.ok) throw new Error('Failed to update todo');
                
                const updatedTodo = await response.json();
                const index = this.todos.findIndex(t => t.id === id);
                this.todos[index] = updatedTodo;
            } catch (error) {
                this.showError('Error updating todo: ' + error.message);
            }
        },

        // Start editing
        startEdit(id, task) {
            this.editingTodoId = id;
            this.editTodoText = task;
            this.$nextTick(() => {
                if (this.$refs.editInput) {
                    this.$refs.editInput.focus();
                }
            });
        },

        // Save edit
        async saveEdit(id) {
            if (!this.editTodoText.trim()) {
                this.cancelEdit();
                return;
            }
            
            try {
                const response = await fetch(`http://localhost:8000/todos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: this.editTodoText.trim() })
                });
                
                if (!response.ok) throw new Error('Failed to update todo');                
                const updatedTodo = await response.json();
                const index = this.todos.findIndex(t => t.id === id);

                this.todos[index] = updatedTodo;
                this.cancelEdit();

            } catch (error) {
                this.showError('Error updating todo: ' + error.message);
            }
        },

        // Delete all todos
        async clearAll() {
            if (!confirm('Are you sure you want to delete ALL todos? This action cannot be undone!')) return;
            
            // try {
            //     const response = await fetch('http://localhost:8000/todos', {
            //         method: 'DELETE'
            //     });
                
            //     if (!response.ok) throw new Error('Failed to delete all todos');
                
            //     this.todos = [];
            // } catch (error) {
            //     this.showError('Error deleting todos: ' + error.message);
            // }
        },

        // Format date
        formatDate(dateString) {
            if (!dateString) return 'N/A';            
            const date = new Date(dateString);

            return date.toLocaleString();
        },
    }))
})
