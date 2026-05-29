from fastapi import FastAPI
from web import todo


# Instantiate a FastAPI application object
app = FastAPI(
    title="Todo API",
    description="A simple API for managing todos",
    version="1.0.0",
)


# Include the todo router in the application
app.include_router(todo.router)


# Run the application using uvicorn when this script is executed directly
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
