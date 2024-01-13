import { FC, useState } from "react";
import { classNames } from "../utils/utils";
import { BuildTodoItemType } from "../types";

type props = {
  postTodoItem: (todo: BuildTodoItemType) => void;
};

const InputTodoTile: FC<props> = ({ postTodoItem }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoTags, setTodoTags] = useState("");
  const resetState = () => {
    setTodoTitle("");
    setTodoDescription("");
    setTodoTags("");
  };
  const isTodoWithoutTitle =
    todoTitle === "" && (todoDescription !== "" || todoTags !== "");

  return (
    <div
      className={
        "flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-accent-100 bg-opacity-30 p-2 text-left text-accent-200 dark:text-accent-100"
      }
    >
      <input
        value={todoTitle}
        onBlur={() => {
          if (isTodoWithoutTitle) return;
          postTodoItem({
            title: todoTitle,
            description: todoDescription,
            tags: todoTags === "" ? [] : todoTags.split(" "),
          });
          resetState();
        }}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add task title"
        type="text"
        className={classNames(
          "rounded bg-accent-100 bg-opacity-0 p-px outline-none focus-visible:ring-0",
          !isTodoWithoutTitle
            ? "text-accent-200 dark:text-accent-100"
            : "bg-red-600 bg-opacity-100",
        )}
      />
      <input
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        type="text"
        placeholder="Your task description"
        className="text-wrap bg-accent-100 bg-opacity-0 font-light italic text-accent-200 outline-none focus-visible:ring-0 dark:text-accent-100"
      />
      <div className="mt-1 flex flex-row flex-wrap justify-end gap-1 italic">
        <input
          value={todoTags}
          onChange={(e) => {
            if (e.target.value.includes(" ")) {
              const splittedToTags = e.target.value
                .split(" ")
                .map((tag) => (tag.includes("#") ? tag : `#${tag}`))
                .join(" ");
              setTodoTags(splittedToTags);
            } else {
              setTodoTags(e.target.value);
            }
          }}
          type="text"
          placeholder="#Add new tag"
          className="w-full bg-accent-100 bg-opacity-0 text-right italic text-accent-200 outline-none focus-visible:ring-0 dark:text-accent-100"
        />
      </div>
    </div>
  );
};

export default InputTodoTile;
