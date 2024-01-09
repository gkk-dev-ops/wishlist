from pydantic import BaseModel
from uuid import UUID
from enum import Enum


class TodoStateEnum(str, Enum):
    new = "new"
    wip = "wip"
    done = "done"
    wont = "wont"


class CreateTodoItem(BaseModel):
    title: str
    description: str
    tags: list[str] = []
    state: TodoStateEnum = TodoStateEnum.new


class TodoItem(BaseModel):
    id: UUID
    title: str
    description: str
    tags: list[str] = []
    state: TodoStateEnum

    class Config:
        orm_mode = True
