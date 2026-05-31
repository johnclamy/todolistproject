exceptions: dict[str, dict[str, str | int]] = {
    "todo_not_found": {"status_code": 404, "detail": "Todo item not found."},
    "no_todos": {"status_code": 404, "detail": "No todos found."},
}

async def handle_exception(exception_key: str) -> dict[str, str | int]:
    exception = exceptions.get(exception_key)
    if exception:
        return {"status_code": exception["status_code"], "detail": exception["detail"]}
    else:
        return {"status_code": 500, "detail": "An unexpected error occurred."}
