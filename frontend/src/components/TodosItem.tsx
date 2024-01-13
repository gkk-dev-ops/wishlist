import { TodoItemType, TodoStateEnum } from "../types";
import { FC, useState } from "react";
import { classNames } from "../utils/utils";
import TodoCardButtons from "./TodoCardButton";

type props = {
  fetchTodos: () => void;
  deleteTodoItem: (todoId: string) => void;
  todosItems: TodoItemType[];
  desiredState: TodoStateEnum;
};

const TodosItem: FC<props> = ({
  deleteTodoItem,
  todosItems,
  desiredState,
  fetchTodos,
}) => {
  const [isBeingDeleted, setIsBeingDeleted] = useState("");
  return todosItems
    .filter((todos) => todos.state === desiredState)
    .map((todo) => {
      return (
        <div
          className={classNames(
            isBeingDeleted === todo.id
              ? "bg-gray-600 bg-opacity-50"
              : "bg-accent-100 bg-opacity-50",
            "flex w-full flex-col gap-2 overflow-hidden rounded-lg p-2 text-left",
          )}
          key={`${todo.title}-${todo.description}-${todosItems.length}}`}
        >
          <div className="flex w-full justify-between">
            <p className="w-full">{todo.title}</p>
            <TodoCardButtons
              fetchTodos={fetchTodos}
              todo={todo}
              setIsBeingDeleted={setIsBeingDeleted}
              deleteTodoItem={deleteTodoItem}
            />
          </div>
          <p className="text-wrap font-light">{todo.description}</p>
          <p className="mt-1 w-full text-wrap text-right text-xs font-light"></p>
          <div className="flex flex-row flex-wrap justify-end gap-1">
            {todo.tags.length ? (
              todo.tags.map((tag) => <p key={tag}>{`#${tag}`}</p>)
            ) : (
              <p className="text-xs font-light italic">No tags</p>
            )}
          </div>
        </div>
      );
    });
};

export default TodosItem;
