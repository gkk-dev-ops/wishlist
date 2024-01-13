export type TodoItemType = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  state: TodoStateEnum;
};

export type BuildTodoItemType = {
  title: string;
  description: string;
  tags: string[];
};

export enum TodoStateEnum {
  new = "new",
  wip = "wip",
  done = "done",
  wont = "wont",
}
