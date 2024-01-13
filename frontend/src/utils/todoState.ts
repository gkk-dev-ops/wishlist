import { TodoStateEnum } from "../types";

export function moveStatus(direction: "up" | "down", status: TodoStateEnum) {
  switch (status) {
    case TodoStateEnum.new:
      return direction === "up" ? TodoStateEnum.new : TodoStateEnum.wip;
    case TodoStateEnum.wip:
      return direction === "up" ? TodoStateEnum.new : TodoStateEnum.wont;
    case TodoStateEnum.wont:
      return direction === "up" ? TodoStateEnum.wip : TodoStateEnum.done;
    case TodoStateEnum.done:
      return direction === "up" ? TodoStateEnum.wont : TodoStateEnum.done;
    default:
      throw new Error("Invalid status");
  }
}
