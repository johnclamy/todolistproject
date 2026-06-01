from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from uuid import UUID, uuid4
from exception import TodoException, TodoNotFoundException, NoTodosException, InternalServerErrorException
import logging


logger = logging.getLogger(__name__)


# Function to register all handlers
def add_exception_handlers(app: FastAPI) -> None:
    """Adds all global exception handlers to the FastAPI application"""

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError
    ) -> JSONResponse:
        """Handles FastAPI/Pydantic validation errors 
        and returns a structured JSON response"""
        
        request_id = getattr(request.state, "request_id", "unknown")
        logging.error(f"Validation error [{request_id}]: {exc.errors()}")

        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "error": {
                    "code": "VALIDATION_ERROR", 
                    "message": "Request validation failed",
                    "details": exc.errors(),
                    "request_id": request_id
                }
            },
        )

    @app.exception_handler(TodoException)
    async def todo_exception_handler(request: Request, exc: TodoException) -> JSONResponse:
        """Handles custom TodoExceptions and returns a structured JSON response"""
        
        request_id = getattr(request.state, "request_id", "unknown")
        logging.error(f"TodoException [{request_id}]: {exc.detail} - {exc.status_code}")

        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": exc.status_code,
                    "message": exc.detail,
                    "request_id": request_id
                }
            },
        )

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        """Handles all uncaught exceptions and returns a structured JSON response"""        
        request_id = getattr(request.state, "request_id", "unknown")

        # Log the full exception details for debugging
        logging.error(f"Unhandled exception [{request_id}]: {exc}", exc_info=True)

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An internal error occurred. Please try again later.",
                    "request_id": request_id
                }
            },
        )