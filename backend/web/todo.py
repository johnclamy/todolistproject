from fastapi import APIRouter


router = APIRouter(prefix="/api/v1/todos", tags=["todos"])


# Set the root endpoint for the todos api
@router.get("/")
async def get_todos():
    return {"todo_list": "List of todos"}

