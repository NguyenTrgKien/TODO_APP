import { Edit, Trash } from "lucide-react";
import type { Task } from "../types/index.type";
import { PRIORITY, STATUS } from "../config/constants";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ActionTaskModel from "./ActionTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { useTask } from "../hooks/useTask";
import { getStatusDeadline } from "../utils/getStatusDeadline";

interface ListViewProp {
  filteredTask: Task[];
}

function ListView({ filteredTask }: ListViewProp) {
  const { selectTasks, setSelectTasks } = useTask();
  const [openActionTaskModal, setOpenActionTaskModal] = useState<Task | null>(
    null,
  );
  const [openDeleteModal, setOpenDeleteModal] = useState<string[] | null>(null);

  return (
    <div
      className="rounded-xl overflow-auto border border-gray-200 dark:border-gray-500 dark:text-gray-100 transition-colors duration-300"
      style={{
        scrollbarWidth: "none",
      }}
    >
      <table className="w-full table-fixed min-w-[600px]">
        <thead>
          <tr className="border-b border-b-gray-300 dark:border-b-gray-500 transition-colors duration-300">
            <th className="text-left py-5 px-4 font-semibold w-[45%]">Task</th>
            <th className="text-left py-5 px-4 font-semibold w-[20%]">
              Trạng thái
            </th>
            <th className="text-left py-5 px-4 font-semibold w-[20%]">
              Mức độ
            </th>
            <th className="text-center py-5 px-4 font-semibold w-[15%]">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTask.length > 0 ? (
            filteredTask.map((task) => {
              const statusDeadline =
                task.deadline &&
                task.status !== "DONE" &&
                getStatusDeadline(task.deadline);
              return (
                <tr key={task.id}>
                  <td className="text-left py-5 px-4 w-[45%]">
                    <div className="flex items-center gap-5">
                      <input
                        type="checkbox"
                        style={{
                          scale: "1.3",
                        }}
                        className="mt-1 z-0"
                        checked={selectTasks.includes(task.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectTasks((prev) => [...prev, task.id]);
                          } else {
                            setSelectTasks((prev) =>
                              prev.filter((it) => it !== task.id),
                            );
                          }
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2.5">
                          <p className="text-[1.6rem] md:text-[1.8rem] text-gray-900 dark:text-gray-100 transition-colors duration-300">
                            {task.title}
                          </p>

                          <div>
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
                        </div>
                        {task.description && (
                          <p className="text-gray-600 text-[1.2rem] truncate max-w-[20rem] dark:text-gray-400">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-left py-5 px-4 w-[20%]">
                    <div className="flex items-center">
                      <div>{STATUS[task.status]}</div>
                    </div>
                  </td>
                  <td className="text-left py-5 px-4 w-[20%]">
                    <div className="flex items-center">
                      <div>{PRIORITY[task.priority]}</div>
                    </div>
                  </td>
                  <td className="text-left py-5 px-4 w-[15%]">
                    <div className="flex items-center justify-center gap-2.5">
                      <button
                        className="p-4 rounded-md bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white transition-colors duration-300"
                        onClick={() => setOpenActionTaskModal(task)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-4 rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors duration-300"
                        onClick={() => {
                          setOpenDeleteModal([task.id]);
                        }}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-16">
                Không có task nào!
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
    </div>
  );
}

export default ListView;
