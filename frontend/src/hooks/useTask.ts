import { useContext } from "react";
import { TaskContext } from "../contexts/taskContext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw Error("Not taskContext");
  }
  return context;
};
