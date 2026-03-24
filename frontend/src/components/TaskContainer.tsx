import { useState } from "react";
import { useTask } from "../hooks/useTask";
import BoardView from "./BoardView";
import ListView from "./ListView";
import { AnimatePresence } from "framer-motion";
import DeleteTaskModal from "./DeleteTaskModal";

interface TaskContainerProp {
  viewType: "board" | "list";
}

function TaskContainer({ viewType }: TaskContainerProp) {
  const {
    tasks,
    filterStatus,
    filterPriority,
    filterTitle,
    selectTasks,
    setSelectTasks,
  } = useTask();
  const [openDeleteModal, setOpenDeleteModal] = useState<string[] | null>(null);

  const filtered = () => {
    return tasks.filter((task) => {
      const matchTitle = task.title
        .toLowerCase()
        .includes(filterTitle.trim().toLowerCase());
      const matchStatus =
        filterStatus === "ALL" || filterStatus === task.status;
      const matchPriority =
        filterPriority === "ALL" || filterPriority === task.priority;
      return matchTitle && matchStatus && matchPriority;
    });
  };

  const isAllChecked =
    filtered().length > 0 &&
    filtered().every((task) => selectTasks.includes(task.id));

  return (
    <div className="w-full h-auto rounded-xl p-8 lg:p-10 bg-white dark:bg-gray-700 dark:text-gray-100 shadow-sm transition-colors duration-300">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold mb-10">Danh sách task</h3>
        {tasks.length > 0 && viewType === "list" && (
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              style={{
                scale: "1.3",
              }}
              checked={isAllChecked}
              onChange={(e) => {
                if (e.target.checked) {
                  const allTaskId = tasks.map((it) => it.id);
                  setSelectTasks(allTaskId);
                } else {
                  setSelectTasks([]);
                }
              }}
            />
            <span
              className={`p-2 rounded-md ${selectTasks.length > 0 ? "text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600" : ""} hover:cursor-pointer`}
              onClick={() => {
                if (selectTasks.length > 0 && tasks.length > 0) {
                  setOpenDeleteModal(selectTasks);
                }
              }}
            >
              Xóa
            </span>
          </div>
        )}
      </div>
      {viewType === "board" ? (
        <BoardView filteredTask={filtered()} />
      ) : (
        <ListView filteredTask={filtered()} />
      )}

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

export default TaskContainer;
