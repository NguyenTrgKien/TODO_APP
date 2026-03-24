export const STATUS = {
  TODO: "Chưa bắt đầu",
  IN_PROGRESS: "Đang thực hiện",
  DONE: "Đã hoàn thành",
};
export const PRIORITY = { LOW: "Thấp", MEDIUM: "Trung bình", HIGH: "Cao" };

export const STATUS_COLOR = {
  TODO: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-600",
  },
  IN_PROGRESS: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-600",
  },
  DONE: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-600",
  },
};

export const PRIORITY_COLORS = {
  LOW: { bg: "bg-slate-100", text: "text-slate-700" },
  MEDIUM: { bg: "bg-yellow-100", text: "text-yellow-700" },
  HIGH: { bg: "bg-red-100", text: "text-red-700" },
};
