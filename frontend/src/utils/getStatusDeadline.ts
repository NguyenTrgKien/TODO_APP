export const getStatusDeadline = (deadline: number) => {
  if (!deadline) return null;

  const now = Date.now();
  const rest = deadline - now;
  const oneDay = 24 * 60 * 60 * 1000;

  if (rest < 0) return "expired";
  if (rest < oneDay) return "warning";
  return "normal";
};
