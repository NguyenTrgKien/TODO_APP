import { motion } from "framer-motion";
import { CircleX } from "lucide-react";
import { PRIORITY, STATUS } from "../config/constants";
import React, { useState } from "react";
import type { Priority, Status, Task } from "../types/index.type";
import { useTask } from "../hooks/useTask";
import { toast } from "react-toastify";

interface ActionTaskModel {
  action: "add" | "edit";
  dataUpdate: Task | null;
  onClose: () => void;
}

export interface TaskForm {
  id?: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  deadline?: number;
}

function ActionTaskModel({ action, dataUpdate, onClose }: ActionTaskModel) {
  const { addTask, editTask } = useTask();
  const [data, setData] = useState<TaskForm>(() => {
    if (action === "edit" && dataUpdate) {
      return {
        id: dataUpdate.id,
        title: dataUpdate.title,
        description: dataUpdate.description,
        status: dataUpdate.status || "TODO",
        priority: dataUpdate.priority || "MEDIUM",
        deadline: dataUpdate.deadline || undefined,
      };
    }
    return {
      id: "",
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      deadline: undefined,
    };
  });
  const [errors, setErrors] = useState({
    title: "",
  });

  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (data.title.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        title: "Vui lòng nhập tiêu đề công việc!",
      }));
      return;
    }

    const newTask: Task = {
      id:
        action === "edit" && dataUpdate
          ? dataUpdate.id
          : Date.now().toString(36),
      createdAt: Date.now(),
      title: data.title,
      description: data.description ?? "",
      status: data.status,
      priority: data.priority,
      deadline: data.deadline ?? undefined,
    };
    if (action === "add") {
      addTask(newTask);
      toast.success("Thêm task thành công!");
    } else {
      editTask(newTask);
      toast.success("Đã cập nhật task!");
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#3333335d] transition-all duration-300 z-[600]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative w-[90%] md:w-[50rem] lg:w-[55rem] h-auto rounded-2xl bg-white dark:bg-gray-600 shadow-xl p-10 transition-colors duration-300"
      >
        <h2 className="text-[1.6rem] md:text-[1.8rem] font-semibold mb-10 dark:text-gray-100 transition-colors duration-300">
          {action === "add" ? "Thêm task mới" : "Chỉnh sửa task"}{" "}
        </h2>
        <CircleX
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100"
          onClick={onClose}
        />

        <div className="space-y-8">
          <div>
            <label
              className="block mb-1 text-gray-500 dark:text-gray-300 transition-colors duration-300 "
              htmlFor="title"
            >
              Tiêu đề *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề..."
              value={data.title}
              className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 dark:text-gray-100 dark:placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-500"
              onFocus={() =>
                setErrors((prev) => ({
                  ...prev,
                  title: "",
                }))
              }
              onChange={handleChangeInput}
            />
            <p className="text-[1.4rem] text-red-500 mt-1">{errors.title}</p>
          </div>
          <div>
            <label
              className="block mb-1 text-gray-500 dark:text-gray-300 transition-colors duration-300"
              htmlFor="description"
            >
              Mô tả
            </label>
            <textarea
              rows={3}
              name="description"
              value={data.description}
              placeholder="Chi tiết công việc (tùy chọn)..."
              className="w-full rounded-md border border-gray-300 focus:border-cyan-400 p-5 dark:placeholder:text-gray-400 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="w-full">
              <label
                className="block mb-1 text-gray-500 dark:text-gray-300 transition-colors duration-300"
                htmlFor="status"
              >
                Trạng thái *
              </label>
              <select
                name="status"
                value={data.status}
                className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500"
                onChange={handleChangeInput}
              >
                {Object.entries(STATUS).map(([key, value]) => {
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label
                className="block mb-1 text-gray-500 dark:text-gray-300 transition-colors duration-300"
                htmlFor="priority"
              >
                Độ ưu tiên *
              </label>
              <select
                name="priority"
                value={data.priority}
                className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500"
                onChange={handleChangeInput}
              >
                {Object.entries(PRIORITY).map(([key, value]) => {
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label
              className="block mb-1 text-gray-500 dark:text-gray-300 transition-colors duration-300"
              htmlFor="deadline"
            >
              Thời hạn *
            </label>
            <input
              type="date"
              name="deadline"
              min={new Date().toISOString().split("T")[0]}
              value={data.deadline}
              className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 p-5 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:[color-scheme:dark]"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center gap-5 justify-end">
            <button
              className="px-5 py-3 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300 dark:text-gray-800"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className="px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white"
              onClick={handleSubmit}
            >
              {action === "add" ? "Thêm task" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ActionTaskModel;
