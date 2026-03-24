import { motion } from "framer-motion";
import { useState } from "react";
import { STATUS } from "../config/constants";
import type { Status, Task } from "../types/index.type";
import { useTask } from "../hooks/useTask";

interface UpdateStatusModalProp {
  task: Task;
  onClose: () => void;
}

function UpdateStatusModal({ task, onClose }: UpdateStatusModalProp) {
  const { updateStatus } = useTask();
  const [data, setData] = useState<Status>(task.status);

  const handleUpdateStatusTask = () => {
    updateStatus(task.id, data);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#3333335d]  transition-all duration-300 z-[600]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative w-[90%] lg:w-[40rem] h-auto rounded-2xl bg-white shadow-xl p-10"
      >
        <h2 className="text-[1.6rem] md:text-[1.8rem] font-medium mb-10">
          Cập nhật trạng thái task
        </h2>
        <select
          name="status"
          value={data}
          className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 overflow-visible"
          onChange={(e) => setData(e.target.value as Status)}
        >
          {Object.entries(STATUS).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>

        <div className="flex items-center gap-2.5 justify-end mt-10">
          <button
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white"
            onClick={handleUpdateStatusTask}
          >
            Lưu thay đổi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UpdateStatusModal;
