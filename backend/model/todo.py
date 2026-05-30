from pydantic import BaseModel
from uuid import UUID


class Todo(BaseModel):
    id: UUID
    task: str
    is_completed: bool
    created_at: str
