import { CircleX } from "lucide-react";
import { motion } from "framer-motion";
import { useTask } from "../hooks/useTask";

interface DeleteTaskModalProp {
  tasks: string[];
  onClose: () => void;
}

function DeleteTaskModal({ tasks, onClose }: DeleteTaskModalProp) {
  const { deleteTasks } = useTask();

  const handleDeleteTasks = () => {
    deleteTasks(tasks);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#3333335d]  transition-all duration-300"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="relative w-[55rem] h-auto rounded-2xl bg-white shadow-xl p-10"
      >
        <p className="text-[1.8rem] font-semibold mb-10">
          Bạn có chắc muốn xóa task này?
        </p>
        <CircleX
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-600"
          onClick={onClose}
        />
        <div className="flex items-center gap-2.5 justify-end">
          <button
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white"
            onClick={handleDeleteTasks}
          >
            Xóa
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeleteTaskModal;
