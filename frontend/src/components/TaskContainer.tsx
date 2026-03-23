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
  const [isChecked, setIsChecked] = useState(false);

  const filtered = () => {
    return tasks.filter((task) => {
      const matchTitle = task.title
        .toLowerCase()
        .includes(filterTitle.trim().toLowerCase());
      const matchStatus =
        filterStatus === "ALL" || filterStatus === task.status;
      const matchPriority =
        filterStatus === "ALL" || filterPriority === task.priority;
      return matchTitle && matchStatus && matchPriority;
    });
  };

  return (
    <div className="w-full h-auto rounded-xl p-10 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold mb-10">Danh sách task</h3>
        {tasks.length > 0 && (
            <div className="flex items-center gap-4">
                <input
                type="checkbox"
                style={{
                    scale: "1.3",
                }}
                onChange={(e) => {
                    if (e.target.checked) {
                    setIsChecked(true);
                    const allTaskId = tasks.map((it) => it.id);
                    setSelectTasks(allTaskId);
                    } else {
                    setIsChecked(false);
                    setSelectTasks([]);
                    }
                }}
                />
                <span
                className={`p-2 rounded-md ${isChecked ? "text-red-500 bg-red-50 hover:bg-red-100 text-red-600" : ""} hover:cursor-pointer`}
                onClick={() => setOpenDeleteModal(selectTasks)}
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
