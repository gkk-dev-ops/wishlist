import { FC, PropsWithChildren } from "react";
import { TodoItemType, TodoStateEnum } from "../types";
import LoadingTodoItem from "./LoadingTodoItem";
import TodosItem from "./TodosItem";

type props = {
  columnLabels: {
    empty: string;
    title: string;
    subtile?: string;
  };
  todosItems: TodoItemType[];
  columnState: TodoStateEnum;
  isLoadingTodos: boolean;
  fetchTodos: () => void;
  deleteTodoItem: (todoId: string) => void;
};

const TodoColumn: FC<PropsWithChildren<props>> = ({
  columnLabels,
  isLoadingTodos,
  fetchTodos,
  columnState,
  deleteTodoItem,
  todosItems,
  children,
}) => {
  function fitleredTodos(state: TodoStateEnum) {
    return todosItems.filter((todos) => todos.state === state);
  }

  return (
    <div className="flex w-60 flex-col gap-4 text-center">
      <div className="min-h-14">
        <p className="text-2xl">{columnLabels.title}</p>
        {columnLabels.subtile && (
          <p className="font-light">{columnLabels.subtile}</p>
        )}
      </div>
      {isLoadingTodos ? <LoadingTodoItem /> : children}
      {fitleredTodos(columnState).length ? (
        <TodosItem
          fetchTodos={fetchTodos}
          deleteTodoItem={(todoId: string) => {
            deleteTodoItem(todoId);
            fetchTodos();
          }}
          todosItems={todosItems}
          desiredState={columnState}
        />
      ) : isLoadingTodos ? null : (
        <p className="italic">{columnLabels.empty}</p>
      )}
    </div>
  );
};

export default TodoColumn;
