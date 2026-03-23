import { Edit, Trash } from "lucide-react";
import type { Task } from "../types/index.type";
import { PRIORITY, STATUS } from "../config/constants";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ActionTaskModel from "./ActionTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { useTask } from "../hooks/useTask";

interface ListViewProp {
  filteredTask: Task[];
}

function ListView({ filteredTask }: ListViewProp) {
  const { selectTasks, setSelectTasks } = useTask();
  const [openActionTaskModal, setOpenActionTaskModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<string[] | null>(null);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-b-gray-300">
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
              return (
                <tr key={task.id}>
                  <td className="text-left py-5 px-4 w-[45%]">
                    <div className="flex items-center gap-5">
                      <input
                        type="checkbox"
                        style={{
                          scale: "1.3",
                        }}
                        className="mt-1"
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
                      <p>{task.title}</p>
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
                        className="p-4 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition-colors duration-300"
                        onClick={() => setOpenActionTaskModal(true)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-4 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                        onClick={() => setOpenDeleteModal([task.id])}
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
            action="add"
            dataUpdate={null}
            onClose={() => setOpenActionTaskModal(false)}
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
