import {
  ClipboardCheck,
  ClipboardList,
  Loader,
  TriangleAlert,
} from "lucide-react";
import { useTask } from "../hooks/useTask";

function StatBar() {
  const { tasks } = useTask();
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const expiredCount = tasks.filter(
    (task) => task.deadline && task.deadline < now && task.status !== "DONE",
  ).length;

  const statList = [
    {
      id: 1,
      title: "Tổng task",
      count: tasks.length,
      icon: ClipboardList,
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border border-blue-300",
    },
    {
      id: 2,
      title: "Đang làm",
      count: tasks.filter((task) => task.status === "IN_PROGRESS").length,
      icon: Loader,
      bg: "bg-amber-50",
      text: "text-amber-500",
      border: "border border-amber-300",
    },
    {
      id: 3,
      title: "Đã hoàn thành",
      count: tasks.filter((task) => task.status === "DONE").length,
      icon: ClipboardCheck,
      bg: "bg-green-50",
      text: "text-green-500",
      border: "border border-green-300",
    },
    {
      id: 4,
      title: "Quá hạn",
      count: expiredCount,
      icon: TriangleAlert,
      bg: "bg-red-50",
      text: "text-red-500",
      border: "border border-red-300",
    },
  ];

  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statList.map((stat) => {
        return (
          <div
            key={stat.id}
            className={`w-full h-auto flex items-center gap-5 p-5 lg:p-10 rounded-xl bg-white dark:bg-gray-700 dark:text-gray-100 shadow-sm transition-colors duration-300`}
          >
            <button
              type="button"
              className={`p-4 rounded-lg ${stat.bg} ${stat.text}`}
            >
              <stat.icon size={25} />
            </button>
            <div>
              <p className="text-[2rem] font-semibold">{stat.count}</p>
              <p>{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatBar;
