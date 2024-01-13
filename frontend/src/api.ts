import axios from "axios";
import { BuildTodoItemType, TodoStateEnum } from "./types";

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
