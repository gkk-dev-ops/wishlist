export type TodoItemType = {
  title: string;
  description: string;
  tags: string[];
  state: TodoStateEnum;
};

export enum TodoStateEnum {
  new = "new",
  wip = "wip",
  done = "done",
  wont = "wont",
}
