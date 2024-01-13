import { TodoItemType, TodoStateEnum } from "../types";
import TrashBinIcon from "../assets/trashbin.svg";
import TrashBinIconDark from "../assets/trashbin-dark.svg";
import { useState } from "react";
import { classNames, isDarkThemePreferred } from "../utils/utils";

type TodosItemProps = {
  deleteTodoItem: (todoId: string) => void;
  todosItems: TodoItemType[];
  desiredState: TodoStateEnum;
};

export default function TodosItem({
  deleteTodoItem,
  todosItems,
  desiredState,
}: TodosItemProps) {
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
            <p>{todo.title}</p>
            <div
              className="min-w-5 cursor-pointer rounded p-1 hover:bg-accent-100"
              onClick={() => {
                setIsBeingDeleted(todo.id);
                setTimeout(() => {
                  setIsBeingDeleted(todo.id);
                }, 2000);
                deleteTodoItem(todo.id);
              }}
            >
              <img
                className="h-4 w-4"
                src={isDarkThemePreferred() ? TrashBinIconDark : TrashBinIcon}
                alt="delete"
              />
            </div>
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
}
