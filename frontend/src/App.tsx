import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { TodoItemType, TodoStateEnum } from "./types";
import InputTodoTile from "./components/InputTodoTile";
import { BASE_URL, deleteTodoItem, postTodoItem } from "./api";
import TodoColumn from "./components/TodoColumn";

export default function App() {
  const [todosItems, setTodosItems] = useState<TodoItemType[]>([]);
  const [apiAvailability, setApiAvailability] = useState<boolean>(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  async function performHealthCheck() {
    const healthCheck = await axios.get(BASE_URL + "/healthcheck");
    if (healthCheck.status === 200) {
      setApiAvailability(true);
    } else {
      setApiAvailability(false);
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

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg	flex-col items-center dark:text-base-light">
      {apiAvailability ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-2 text-center text-accent-200 dark:text-accent-100">
          <p className="text-2xl">What media, features do you</p>
          <p className="text-6xl">Wish?</p>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-2 text-center text-accent-200 dark:text-accent-100">
          <img src="http://staticassets.wronet/fire.svg" />
          <p className="text-2xl">Contact administrator</p>
          <p className="text-6xl">Something went wrong</p>
        </div>
      )}
      <div className="mt-14 flex flex-row flex-wrap justify-center gap-4">
        <TodoColumn
          todosItems={todosItems}
          deleteTodoItem={(todoId: string) => {
            deleteTodoItem(todoId);
            fetchTodos();
          }}
          isLoadingTodos={isLoadingTodos}
          fetchTodos={fetchTodos}
          columnState={TodoStateEnum.new}
          columnLabels={{
            empty: "No new ideas",
            title: "Add new:",
            subtile: "And why",
          }}
        >
          <InputTodoTile
            postTodoItem={(todo) => {
              postTodoItem(todo);
              fetchTodos();
            }}
          />
        </TodoColumn>
        <TodoColumn
          todosItems={todosItems}
          deleteTodoItem={(todoId: string) => {
            deleteTodoItem(todoId);
            fetchTodos();
          }}
          isLoadingTodos={isLoadingTodos}
          fetchTodos={fetchTodos}
          columnState={TodoStateEnum.wip}
          columnLabels={{
            empty: "No work is in progress",
            title: "Work in progress",
          }}
        />
        <TodoColumn
          todosItems={todosItems}
          deleteTodoItem={(todoId: string) => {
            deleteTodoItem(todoId);
            fetchTodos();
          }}
          isLoadingTodos={isLoadingTodos}
          fetchTodos={fetchTodos}
          columnState={TodoStateEnum.wont}
          columnLabels={{
            empty: "Nothing is impossible to do",
            title: "Won&apos;t do",
          }}
        />
        <TodoColumn
          todosItems={todosItems}
          deleteTodoItem={(todoId: string) => {
            deleteTodoItem(todoId);
            fetchTodos();
          }}
          isLoadingTodos={isLoadingTodos}
          fetchTodos={fetchTodos}
          columnState={TodoStateEnum.done}
          columnLabels={{
            empty: "Nothing was done",
            title: "Done",
          }}
        />
      </div>
    </main>
  );
}
