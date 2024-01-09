import { useState } from "react";
import { classNames } from "../utils/utils";

export default function InputTodoTile() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoTags, setTodoTags] = useState("");
  const isTodoWithoutTitle = todoTitle === "" && (todoDescription !== "" || todoTags !== "")

  // TODO: Fetch to BE once user stops typing for 2s. If user starts typing again, send PUT request to BE with new data.
  return (
    <div className={"flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-accent-100 bg-opacity-30 p-2 text-left text-accent-200 dark:text-accent-100"}>
      <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} placeholder="Add task title" type="text" className={classNames("p-px rounded bg-opacity-0 bg-accent-100 focus-visible:ring-0 outline-none", !isTodoWithoutTitle ? "text-accent-200 dark:text-accent-100" : "bg-opacity-100 bg-red-600")} />
      <input value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)} type="text" placeholder="Your task description" className="bg-opacity-0 bg-accent-100 text-accent-200 dark:text-accent-100 focus-visible:ring-0 outline-none text-wrap font-light italic" />
      <div className="mt-1 flex flex-row flex-wrap justify-end gap-1 italic">
      <input value={todoTags} onChange={(e) => {
        if (e.target.value.includes(" ")) {
          const splittedToTags = e.target.value.split(" ").map(tag => tag.includes("#") ? tag : `#${tag}`).join(" ")
          setTodoTags(splittedToTags)
        } else {
          setTodoTags(e.target.value)
        }}}
        type="text" placeholder="#Add new tag" className="w-full bg-opacity-0 bg-accent-100 text-accent-200 dark:text-accent-100 focus-visible:ring-0 outline-none italic text-right" />
      </div>
    </div>
  );
}
