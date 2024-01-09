from fastapi import FastAPI, Depends, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from uuid import UUID
from wish import models, schemas, crud
from wish.database import SessionLocal, engine
import os
import json


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


models.Base.metadata.create_all(bind=engine)
app = FastAPI()

ALLOWED_ORIGINS = json.loads(os.environ.get(
    "ALLOWED_ORIGINS") if os.environ.get("ALLOWED_ORIGINS") else "[]")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ALLOWED_ORIGINS else ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# todosItems = [
#     {
#         "title": "Pobierz 13 posterunek",
#         "description": "Pobierz na jellyfin",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz pingwiny z Madagaskaru",
#         "description": "Pobierz na jellyfin",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz the good plays",
#         "description": "",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz Lucyfera",
#         "description": "",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz Edd Sheeran",
#         "description": "",
#         "tags": ["music", "finamp"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz j Kaczmarski",
#         "description": "",
#         "tags": ["music", "finamp"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz kolędy",
#         "description": "",
#         "tags": ["music", "finamp"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Povierz Marek Grechuta",
#         "description": "",
#         "tags": ["music", "finamp"],
#         'state': schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz Koen",
#         "description": "",
#         "tags": ["music", "finamp"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz autora - Lemon tree",
#         "description": "",
#         "tags": ["music", "finamp"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Pobierz Chriss de Barg",
#         "description": "",
#         "tags": ["music", "finamp"],
#         "state": schemas.TodoStateEnum.new,
#     },
#     {
#         "title": "Znajdź i pobierz Utopia",
#         "description": "https://www.stan.com.au/watch/utopia-2014",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.wip,
#     },
#     {
#         "title": "Pobierz z yt",
#         "description": """Kllier - https://www.youtube.com/watch?v=VfYhB3pwO_w
#           Killerów 2óch - https://www.youtube.com/watch?v=wDhifelpwps""",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.done,
#     },
#     {
#         "title": "Pobierz Friends (en)",
#         "description": "[znajdź skąd ]",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.wont,
#     },
#     {
#         "title": "Pobierz Vinci",
#         "description": "",
#         "tags": ["watch", "jellyfin"],
#         "state": schemas.TodoStateEnum.wont,
#     },
# ]


@app.get("/healthcheck")
def healtch():
    return {"status": "ok"}


@app.get("/api/todos")
def get_todo_items(db: SessionLocal = Depends(get_db)):
    return crud.get_all_todos(db)


@app.post("/api/todo")
def get_todo_items(todo_item: schemas.CreateTodoItem, db: SessionLocal = Depends(get_db)):
    return crud.create_todo_item(db, todo_item)


@app.delete("/api/todo")
def remove_todo_item(todo_id: UUID, db: SessionLocal = Depends(get_db)):
    todo_item_to_be_removed = crud.find_todo_item(
        todo_id=todo_id, db=db)
    if not todo_item_to_be_removed:
        return Response(status_code=204)
    return crud.remove_todo_item(db, todo_id)


@app.put("/api/todo")
def update_todo_item(todo_item: schemas.TodoItem, db: SessionLocal = Depends(get_db)):
    todo_item_to_be_updated = crud.find_todo_item(
        todo_id=todo_item.id, db=db)
    if not todo_item_to_be_updated:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return crud.update_todo_item(db, todo_item)


if os.path.exists("../frontend/dist"):
    app.mount("/", StaticFiles(directory="../frontend/dist", html=True))
