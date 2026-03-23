import React, { createContext } from "react";
import type { Status, Task } from "../types/index.type";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (dataUpdate: Task) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  filterTitle: string;
  setFilterTitle: (title: string) => void;
  deleteTasks: (taskIds: string[]) => void;
  selectTasks: string[];
  setSelectTasks: React.Dispatch<React.SetStateAction<string[]>>;
  updateStatus: (taskId: string, status: Status) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);
