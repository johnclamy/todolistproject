from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class Todo(BaseModel):
    id: UUID
    task: str
    is_completed: bool
    created_at: datetime
