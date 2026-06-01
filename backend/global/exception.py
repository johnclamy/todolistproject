from fastapi import HTTPException, status


class TodoException(HTTPException):
    def __init__(
        self,
        code: str,
        message: str="Bad Request",
        status_code: int=status.HTTP_400_BAD_REQUEST
    ):
        super().__init__(
            status_code=status_code,
            detail={"code": code, "message": message}
        )


class TodoNotFoundException(TodoException):
    def __init__(self, entity: str, identifier: str):
        super().__init__(
            code="TODO_NOT_FOUND",
            message=f"{entity} with identifier {identifier} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )


class NoTodosException(TodoException):
    def __init__(self, entity: str, identifier: str):
        super().__init__(
            code="NO_TODOS_FOUND",
            message=f"No todos found for {entity} with identifier {identifier}",
            status_code=status.HTTP_404_NOT_FOUND
        )


class InternalServerErrorException(TodoException):
    def __init__(self, entity: str, identifier: str):
        super().__init__(
            code="INTERNAL_SERVER_ERROR",
            message=f"Internal server error occurred for {entity} with identifier {identifier}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )