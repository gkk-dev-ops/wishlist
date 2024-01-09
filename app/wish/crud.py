from sqlalchemy.orm import Session
from uuid import uuid4, UUID
from . import models, schemas


def get_all_todos(db: Session):
    all_todo_items = db.query(models.SavedTodoItem).all()
    for todo_item in all_todo_items:
        todo_item.tags = todo_item.tags.split(',')
    return all_todo_items


def create_todo_item(db: Session, todo: schemas.CreateTodoItem):
    db_todo = models.SavedTodoItem(
        title=todo.title, description=todo.description, tags=','.join(todo.tags), state=todo.state.value, id=uuid4())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def find_todo_item(db: Session, todo_id: UUID):
    return db.query(models.SavedTodoItem).filter(models.SavedTodoItem.id == todo_id).first()


def update_todo_item(db: Session, todo_item: schemas.TodoItem):
    db_todo = find_todo_item(todo_id=todo_item.id, db=db)
    db_todo.title = todo_item.title
    db_todo.description = todo_item.description
    db_todo.tags = ','.join(todo_item.tags)
    db_todo.state = todo_item.state.value
    db.commit()
    db.refresh(db_todo)
    return db_todo


def remove_todo_item(db: Session, todo_id: int):
    db_todo = find_todo_item(todo_id=todo_id, db=db)
    db.delete(db_todo)
    db.commit()
    return db_todo
