import { classNames } from "../utils/utils";
import Lottie from "react-lottie";
import loaderLottie from "../assets/loader-lottie.json";

export default function LoadingTodoItem() {
  return (
    <div
      className={classNames(
        "bg-accent-100 bg-opacity-50",
        "flex w-full flex-col gap-2 overflow-hidden rounded-lg p-2 text-left",
      )}
    >
      <div className="flex w-full justify-between">
        <div className="-mb-6 -mt-2">
          <Lottie options={{ animationData: loaderLottie }} width={80} />
        </div>
      </div>
      <div className="-mb-20 -mt-12">
        <Lottie options={{ animationData: loaderLottie }} width={240} />
      </div>
      <p className="mt-1 w-full text-wrap text-right text-xs font-light"></p>
      <div className="flex flex-row flex-wrap justify-end gap-1">
        <div className="">
          <Lottie options={{ animationData: loaderLottie }} width={60} />
        </div>
      </div>
    </div>
  );
}
