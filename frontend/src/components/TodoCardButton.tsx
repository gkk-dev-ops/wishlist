import { isDarkThemePreferred } from "../utils/utils";
import TrashBinIcon from "../assets/trashbin.svg";
import TrashBinIconDark from "../assets/trashbin-dark.svg";
import ArrowUpIcon from "../assets/arrow-up.svg";
import ArrowUpIconDark from "../assets/arrow-up-dark.svg";
import ArrowDownIcon from "../assets/arrow-down.svg";
import ArrowDownIconDark from "../assets/arrow-down-dark.svg";
import { TodoItemType } from "../types";
import { FC } from "react";
import { moveStatus } from "../utils/todoState";
import { updateTodoItem } from "../api";

type props = {
  fetchTodos: () => void;
  setIsBeingDeleted: (todoId: string) => void;
  deleteTodoItem: (todoId: string) => void;
  todo: TodoItemType;
};

const TodoCardButtons: FC<props> = ({
  setIsBeingDeleted,
  deleteTodoItem,
  todo,
  fetchTodos,
}) => {
  return (
    <div className="flex flex-row gap-0.5">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded p-0.5 hover:bg-accent-100"
        onClick={() => {
          setIsBeingDeleted(todo.id);
          setTimeout(() => {
            setIsBeingDeleted(todo.id);
          }, 2000);
          deleteTodoItem(todo.id);
        }}
      >
        <img
          src={isDarkThemePreferred() ? TrashBinIconDark : TrashBinIcon}
          alt="delete"
        />
      </div>
      <div
        onClick={() => {
          updateTodoItem({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            tags: todo.tags,
            state: moveStatus("up", todo.state),
          });
          fetchTodos();
        }}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded p-0.5 hover:bg-accent-100"
      >
        <img
          src={isDarkThemePreferred() ? ArrowDownIconDark : ArrowUpIcon}
          alt="delete"
        />
      </div>
      <div
        onClick={() => {
          updateTodoItem({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            tags: todo.tags,
            state: moveStatus("down", todo.state),
          });
          fetchTodos();
        }}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded p-0.5 hover:bg-accent-100"
      >
        <img
          src={isDarkThemePreferred() ? ArrowUpIconDark : ArrowDownIcon}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default TodoCardButtons;
