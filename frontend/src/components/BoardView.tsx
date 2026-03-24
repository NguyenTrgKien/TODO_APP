import { Edit, Trash } from "lucide-react";
import type { Task } from "../types/index.type";
import {
  PRIORITY,
  PRIORITY_COLORS,
  STATUS,
  STATUS_COLOR,
} from "../config/constants";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ActionTaskModel from "./ActionTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { useTask } from "../hooks/useTask";
import UpdateStatusModal from "./UpdateStatusModal";
import { getStatusDeadline } from "../utils/getStatusDeadline";

interface BoardViewProp {
  filteredTask: Task[];
}

function BoardView({ filteredTask }: BoardViewProp) {
  const { updateStatus } = useTask();
  const formatTime = (time: number) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: vi });
  };
  const [openActionTaskModal, setOpenActionTaskModal] = useState<Task | null>(
    null,
  );
  const [openDeleteModal, setOpenDeleteModal] = useState<string[] | null>(null);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] =
    useState<Task | null>(null);

  return (
    <>
      {filteredTask.length > 0 ? (
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTask.map((task) => {
            const statusDeadline =
              task.deadline &&
              task.status !== "DONE" &&
              getStatusDeadline(task.deadline);
            return (
              <div
                key={task.id}
                className="w-full h-auto border border-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500 shadow-sm p-5 rounded-xl space-y-5 transition-colors duration-300"
              >
                <div className="flex items-center justify-between border-b border-b-gray-300 dark:border-b-gray-500 pb-8 transition-colors duration-300">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <p className="text-[1.8rem] truncate max-w-[15rem]">
                        {task.title}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-[1.2rem] ${PRIORITY_COLORS[task.priority].bg} ${PRIORITY_COLORS[task.priority].text}`}
                      >
                        {PRIORITY[task.priority]}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-gray-600 text-[1.4rem] dark:text-gray-300 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <p className="text-[1.2rem] dark:text-gray-400">
                      {task.updatedAt
                        ? "Cập nhật " + formatTime(task.updatedAt)
                        : "Tạo " + formatTime(task.createdAt)}
                    </p>
                    {statusDeadline && (
                      <>
                        {statusDeadline === "expired" && (
                          <span className="text-red-600 text-[1.2rem] px-4 py-1 rounded-full bg-red-50 dark:bg-red-900/30 transition-colors duration-300">
                            Đã quá hạn
                          </span>
                        )}
                        {statusDeadline === "warning" && (
                          <span className="text-amber-600 text-[1.2rem] p-4 py-1 rounded-full bg-red-50 dark:bg-amber-900/30 transition-colors duration-300">
                            Sắp tới hạn
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      className="p-3 rounded-md bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white transition-colors duration-300 "
                      onClick={() => setOpenActionTaskModal(task)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-3 rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors duration-300 "
                      onClick={() => setOpenDeleteModal([task.id])}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-2.5 justify-between">
                  <button
                    className={`border px-4 py-1 rounded-full text-[1.4rem] ${STATUS_COLOR[task.status].bg} ${STATUS_COLOR[task.status].text} ${STATUS_COLOR[task.status].border} cursor-pointer`}
                    onClick={() => updateStatus(task.id, task.status)}
                  >
                    {STATUS[task.status]}
                  </button>
                  <button
                    className="text-[1.4rem] px-2 py-1 text-amber-500 hover:text-amber-700 hover:cursor-pointer transition-colors duration-300"
                    onClick={() => setOpenUpdateStatusModal(task)}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full text-center py-16 dark:text-gray-400 transition-colors duration-300">
          Không có task nào!
        </div>
      )}

      <AnimatePresence>
        {openActionTaskModal && (
          <ActionTaskModel
            action="edit"
            dataUpdate={openActionTaskModal}
            onClose={() => setOpenActionTaskModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openDeleteModal && (
          <DeleteTaskModal
            tasks={openDeleteModal}
            onClose={() => setOpenDeleteModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openUpdateStatusModal && (
          <UpdateStatusModal
            task={openUpdateStatusModal}
            onClose={() => setOpenUpdateStatusModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default BoardView;
