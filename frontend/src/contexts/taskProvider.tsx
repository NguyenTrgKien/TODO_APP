import React, { useState } from "react";
import type { Status, Task } from "../types/index.type";
import { TaskContext } from "./taskContext";

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksJson = localStorage.getItem("tasks");
    return tasksJson ? JSON.parse(tasksJson) : [];
  });
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [filterTitle, setFilterTitle] = useState("");
  const [selectTasks, setSelectTasks] = useState<string[]>([]);

  const addTask = (task: Task) => {
    const newList = [...tasks, task];
    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  const editTask = (dataUpdate: Task) => {
    const newList = tasks.map((task) =>
      task.id === dataUpdate.id ? dataUpdate : task,
    );
    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  const deleteTasks = (taskIds: string[]) => {
    const newList = tasks.filter((task) => !taskIds.includes(task.id));
    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  const updateStatus = (taskId: string, status: Status) => {
    const newList = tasks.map((it) => {
      if (it.id === taskId) {
        return {
          ...it,
          status: status,
        };
      }
      return it;
    });
    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        filterStatus,
        setFilterStatus,
        filterPriority,
        setFilterPriority,
        filterTitle,
        setFilterTitle,
        deleteTasks,
        selectTasks,
        setSelectTasks,
        updateStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
