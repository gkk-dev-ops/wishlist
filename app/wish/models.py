from sqlalchemy import Column, String, Uuid, ARRAY
from sqlalchemy.orm import Mapped
from .database import Base
from .schemas import TodoStateEnum
from uuid import UUID
from sqlalchemy import event
from sqlalchemy.orm.session import Session


class SavedTodoItem(Base):
    __tablename__ = "saved_todo_item"

    id: Mapped[UUID] = Column(Uuid, primary_key=True, unique=True)
    title = Column(String)
    description = Column(String)
    tags = Column(String)
    state: Mapped[TodoStateEnum] = Column(String)
