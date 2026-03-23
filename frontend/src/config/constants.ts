export const STATUS = {
  TODO: "Chưa bắt đầu",
  IN_PROGRESS: "Đang thực hiện",
  DONE: "Đã hoàn thành",
};
export const PRIORITY = { LOW: "Thấp", MEDIUM: "Trung bình", HIGH: "Cao" };

export const STATUS_COLOR = {
  TODO: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-500",
  },
  IN_PROGRESS: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-500",
  },
  DONE: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-500",
  },
};

export const PRIORITY_COLORS = {
  LOW: { bg: "bg-slate-100", text: "text-slate-500" },
  MEDIUM: { bg: "bg-yellow-50", text: "text-yellow-600" },
  HIGH: { bg: "bg-red-50", text: "text-red-500" },
};
