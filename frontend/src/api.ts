import axios from "axios";
import { BuildTodoItemType, TodoItemType, TodoStateEnum } from "./types";

export const HOST = import.meta.env.VITE_HOST;
export const protocol = "http";
export const PORT = import.meta.env.VITE_PORT;
export const BASE_URL = `${protocol}://${HOST}:${PORT}`;

export function deleteTodoItem(todoId: string) {
  axios.delete(`${BASE_URL}/api/todo?todo_id=${todoId}`);
}

export function postTodoItem(todo: BuildTodoItemType) {
  axios.post(`${BASE_URL}/api/todo`, {
    title: todo.title,
    description: todo.description,
    tags: todo.tags,
    state: TodoStateEnum.new,
  });
}

export function updateTodoItem(todo: TodoItemType) {
  axios.put(`${BASE_URL}/api/todo`, {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    tags: todo.tags,
    state: todo.state,
  });
}
