from fastapi import HTTPException
from model.todo import Todo, TodoCreate, TodoUpdate
from uuid import UUID, uuid4
from datetime import datetime
from data.mock.todo import mock_todos as todos


# All todo CRUD operations will be defined in this module.
# Toggle the data import between mock data and actual database 
# calls as needed. See data directory.

async def read_todos() -> list[Todo]:
    # This function will read all the todo items from the database
    # and return them as a list of Todo objects.
    return todos


async def read_todo(todo_id: UUID) -> Todo:
    # This function will read a single todo item from the database
    # based on the provided id and return it as a Todo object.
    for todo in todos:
        if todo.id == todo_id:
            return todo
        
    raise HTTPException(status_code=404, detail=f"Todo with id {todo_id} not found")


async def create_todo(todo_data: TodoCreate) -> Todo:
    # This function will create a new todo item in the database
    # with the provided task and return it as a Todo object.
    if len(todo_data.task) > 0:
        task = todo_data.task
    else:
        raise HTTPException(status_code=400, detail="Task cannot be empty")


    todo = Todo(
        id=uuid4(),
        task=task,
        is_completed=False,
        created_at=datetime.now().isoformat()
    )

    if todo:
        todos.append(todo)
        return todo

    raise HTTPException(status_code=500, detail="Failed to create todo item")


async def update_todo(todo_id: UUID, todo_data: TodoUpdate) -> Todo:
    # This function will update an existing todo item in the database
    # based on the provided id, task, and is_completed values, and return
    # the updated item as a Todo object.
    for todo in todos:
        if todo.id == todo_id:
            todo.task = todo_data.task
            todo.is_completed = todo_data.is_completed
            return todo

    raise HTTPException(status_code=400, detail=f"Update did not take effect for todo with id {todo_id}")


async def delete_todo(todo_id: UUID) -> None:
    # This function will delete a todo item from the database based on
    # the provided id. It does not return anything.
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            del todos[i]
            return

    raise HTTPException(status_code=404, detail=f"Todo with id {todo_id} not found")
