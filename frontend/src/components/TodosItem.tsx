import { TodoItemType, TodoStateEnum } from "../types";

type TodosItemProps = {
  todosItems: TodoItemType[];
  desiredState: TodoStateEnum;
};

export default function TodosItem({
  todosItems,
  desiredState,
}: TodosItemProps) {
  return todosItems
    .filter((todos) => todos.state === desiredState)
    .map((todo) => {
      return (
        <div
          className="flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-accent-100 bg-opacity-50 p-2 text-left"
          key={`${todo.title}-${todo.description}`}
        >
          <p>{todo.title}</p>
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
