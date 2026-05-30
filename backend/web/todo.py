from fastapi import APIRouter
from uuid import UUID
from model.todo import Todo, TodoCreate, TodoUpdate
from crud.todo import read_todos, read_todo, create_todo, update_todo, delete_todo


router = APIRouter(prefix="/api/v1/todos", tags=["todos"])


# Set the root endpoint for the todos api
@router.get("/")
async def get_todos() -> dict[str, list[Todo]]:
    todos = await read_todos()
    return {"todo_list": todos}


# Set the endpoint for getting a single todo item by id
@router.get("/{todo_id}")
async def get_todo(todo_id: UUID) -> dict[str, Todo]:
    todo = await read_todo(todo_id)
    return {"todo": todo}


# Set the endpoint for creating a new todo item
@router.post("/")
async def post_todo(todo_task: TodoCreate) -> dict[str, Todo]:
    todo = await create_todo(todo_task)
    return {"todo": todo}