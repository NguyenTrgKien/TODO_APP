import {
  ClipboardCheck,
  ClipboardList,
  Loader,
  TriangleAlert,
} from "lucide-react";

const statList = [
  {
    id: 1,
    title: "Tổng task",
    icon: ClipboardList,
    bg: "bg-blue-50",
    text: "text-blue-500",
    border: "border border-blue-300",
  },
  {
    id: 2,
    title: "Đang làm",
    icon: Loader,
    bg: "bg-amber-50",
    text: "text-amber-500",
    border: "border border-amber-300",
  },
  {
    id: 3,
    title: "Hoàn thành",
    icon: ClipboardCheck,
    bg: "bg-green-50",
    text: "text-green-500",
    border: "border border-green-300",
  },
  {
    id: 4,
    title: "Quá hạn",
    icon: TriangleAlert,
    bg: "bg-red-50",
    text: "text-red-500",
    border: "border border-red-300",
  },
];

function StatBar() {
  return (
    <div className="w-full h-auto grid grid-cols-4 gap-5">
      {statList.map((stat) => {
        return (
          <div
            key={stat.id}
            className={`w-full h-auto flex items-center gap-5 p-10 rounded-xl bg-white shadow-sm`}
          >
            <button
              type="button"
              className={`p-4 rounded-lg ${stat.bg} ${stat.text}`}
            >
              <stat.icon size={25} />
            </button>
            <div>
              <p className="text-[2rem] font-semibold">9</p>
              <p>{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatBar;
