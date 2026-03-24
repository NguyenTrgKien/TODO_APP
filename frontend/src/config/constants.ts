export const STATUS = {
  TODO: "Chưa bắt đầu",
  IN_PROGRESS: "Đang thực hiện",
  DONE: "Đã hoàn thành",
};
export const PRIORITY = { LOW: "Thấp", MEDIUM: "Trung bình", HIGH: "Cao" };

export const STATUS_COLOR = {
  TODO: {
    bg: "bg-blue-50 dark:bg-blue-900/30 transition-colors duration-300",
    text: "text-blue-600 dark:text-blue-400 transition-colors duration-300",
    border: "border-blue-600 dark:border-blue-400 transition-colors duration-300",
  },
  IN_PROGRESS: {
    bg: "bg-amber-50 dark:bg-amber-900/30 transition-colors duration-300",
    text: "text-amber-600 dark:text-amber-400 transition-colors duration-300",
    border: "border-amber-600 dark:border-amber-400 transition-colors duration-300",
  },
  DONE: {
    bg: "bg-green-50 dark:bg-green-900/30 transition-colors duration-300",
    text: "text-green-600 dark:text-green-400 transition-colors duration-300",
    border: "border-green-600 dark:border-green-400 transition-colors duration-300",
  },
};

export const PRIORITY_COLORS = {
  LOW: {
    bg: "bg-slate-100 dark:bg-slate-700/50 transition-colors duration-300",
    text: "text-slate-700 dark:text-slate-300 transition-colors duration-300",
  },
  MEDIUM: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30 transition-colors duration-300",
    text: "text-yellow-700 dark:text-yellow-400 transition-colors duration-300",
  },
  HIGH: {
    bg: "bg-red-100 dark:bg-red-900/30 transition-colors duration-300",
    text: "text-red-700 dark:text-red-400 transition-colors duration-300",
  },
};
