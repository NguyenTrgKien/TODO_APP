import { Edit, Trash } from "lucide-react";
import type { Status, Task } from "../types/index.type";
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

interface BoardViewProp {
  filteredTask: Task[];
}

function BoardView({ filteredTask }: BoardViewProp) {
  const { updateStatus } = useTask();
  const formatTime = (time: number) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: vi });
  };
  const [openActionTaskModal, setOpenActionTaskModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<string[] | null>(null);

  return (
    <>
      {filteredTask.length > 0 ? (
        <div className="w-full h-auto grid grid-cols-3">
          {filteredTask.map((task) => {
            return (
              <div
                key={task.id}
                className="w-full h-auto border border-gray-200 shadow-sm p-5 rounded-xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-b-gray-300 pb-8">
                  <div className="flex items-start gap-5">
                    <div>
                      <p className="text-[1.8rem]">{task.title}</p>
                      <p className="text-[1.4rem]">
                        {task.updatedAt
                          ? "Cập nhật " + formatTime(task.updatedAt)
                          : "Tạo " + formatTime(task.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-[1.2rem] ${PRIORITY_COLORS[task.priority].bg} ${PRIORITY_COLORS[task.priority].text}`}
                    >
                      {PRIORITY[task.priority]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      className="p-3 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition-colors duration-300"
                      onClick={() => setOpenActionTaskModal(true)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-3 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                      onClick={() => setOpenDeleteModal([task.id])}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-2.5 ">
                  {(Object.entries(STATUS) as [Status, string][]).map(
                    ([key, value]) => (
                      <button
                        key={key}
                        className={`... ${STATUS_COLOR[key].bg} ${STATUS_COLOR[key].text} ${STATUS_COLOR[key].border}`}
                        onClick={() => updateStatus(task.id, key)}
                      >
                        {value}
                      </button>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full text-center py-16">Không có task nào!</div>
      )}

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
    </>
  );
}

export default BoardView;
