from pydantic import BaseModel
from uuid import UUID


# This is the model for a todo item. It has an id, a task, 
# a boolean to indicate if it is completed, and a timestamp 
# for when it was created.

class Todo(BaseModel):
    id: UUID
    task: str
    is_completed: bool
    created_at: str


# This is the model for creating a new todo item. It only has a task, 
# because the id, is_completed, and created_at fields will be generated 
# automatically when the item is created.

class TodoCreate(BaseModel):
    task: str


# This is the model for updating an existing todo item. It has a task 
# and an is_completed field, which can be updated. The id and created_at
#  fields cannot be updated, so they are not included in this model.

class TodoUpdate(BaseModel):
    task: str
    is_completed: bool
