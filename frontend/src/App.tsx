import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { TodoItemType, TodoStateEnum } from "./types";
import TodosItem from "./components/TodosItem";
import InputTodoTile from "./components/InputTodoTile";
import { BASE_URL, deleteTodoItem, postTodoItem } from "./api";
import LoadingTodoItem from "./components/LoadingTodoItem";

export default function App() {
  const [todosItems, setTodosItems] = useState<TodoItemType[]>([]);
  const [apiAvailability, setApiAvailability] = useState<boolean>(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  async function performHealthCheck() {
    const healthCheck = await axios.get(BASE_URL + "/healthcheck");
    if (healthCheck.status === 200) {
      setApiAvailability(true);
    }
  }
  async function fetchTodos() {
    setIsLoadingTodos(true);
    console.log("fetching new todos");
    setTimeout(async () => {
      const todos = await axios.get(BASE_URL + "/api/todos");
      setTodosItems(todos.data);
      setIsLoadingTodos(false);
    }, 1500);
  }

  useEffect(() => {
    performHealthCheck();
  });

  useEffect(() => {
    if (apiAvailability) {
      fetchTodos();
    }
  }, [apiAvailability]);

  function fitleredTodos(state: TodoStateEnum) {
    return todosItems.filter((todos) => todos.state === state);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg	flex-col items-center dark:text-base-light">
      <div className="mt-16 flex flex-col items-center justify-center gap-2 text-center text-accent-200 dark:text-accent-100">
        <p className="text-2xl">What media, features do you</p>
        <p className="text-6xl">Wish?</p>
      </div>
      <div className="mt-14 flex flex-row flex-wrap justify-center gap-4">
        <div className="flex w-60 flex-col gap-4 text-center">
          <div className="min-h-14">
            <p className="text-2xl">Add new:</p>
            <p className="font-light">And why</p>
          </div>
          {isLoadingTodos ? (
            <LoadingTodoItem />
          ) : (
            <InputTodoTile
              postTodoItem={(todo) => {
                postTodoItem(todo);
                fetchTodos();
              }}
            />
          )}
          {fitleredTodos(TodoStateEnum.new).length ? (
            <TodosItem
              deleteTodoItem={(todoId: string) => {
                deleteTodoItem(todoId);
                fetchTodos();
              }}
              todosItems={todosItems}
              desiredState={TodoStateEnum.new}
            />
          ) : (
            <p className="italic">Nothing to do</p>
          )}
        </div>
        <div className="flex w-60 flex-col gap-4 text-center">
          <div className="min-h-14">
            <p className="text-2xl">Work in progress</p>
          </div>
          {fitleredTodos(TodoStateEnum.wip).length ? (
            <TodosItem
              deleteTodoItem={(todoId: string) => {
                deleteTodoItem(todoId);
                fetchTodos();
              }}
              todosItems={todosItems}
              desiredState={TodoStateEnum.wip}
            />
          ) : (
            <p className="italic">No work is in progress</p>
          )}
        </div>
        <div className="flex w-60 flex-col gap-4 text-center">
          <div className="min-h-14">
            <p className="text-2xl">Won&apos;t do</p>
          </div>
          {fitleredTodos(TodoStateEnum.wont).length ? (
            <TodosItem
              deleteTodoItem={(todoId: string) => {
                deleteTodoItem(todoId);
                fetchTodos();
              }}
              todosItems={todosItems}
              desiredState={TodoStateEnum.wont}
            />
          ) : (
            <p className="italic">Nothing is impossible to do</p>
          )}
        </div>
        <div className="flex w-60 flex-col gap-4 text-center">
          <div className="min-h-14">
            <p className="text-2xl">Done</p>
          </div>
          {fitleredTodos(TodoStateEnum.done).length ? (
            <TodosItem
              deleteTodoItem={(todoId: string) => {
                deleteTodoItem(todoId);
                fetchTodos();
              }}
              todosItems={todosItems}
              desiredState={TodoStateEnum.done}
            />
          ) : (
            <p className="italic">Nothing was done</p>
          )}
        </div>
      </div>
    </main>
  );
}
