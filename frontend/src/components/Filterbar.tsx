import { PRIORITY, STATUS } from "../config/constants";
import { useTask } from "../hooks/useTask";

function FilterBar() {
  const {
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    filterTitle,
    setFilterTitle,
  } = useTask();

  return (
    <div className="w-full h-auto p-8 lg:p-10 bg-white dark:bg-gray-700 dark:text-gray-100 grid grid-cols-4 lg:grid-cols-5 gap-5 shadow-sm rounded-xl transition-colors duration-300">
      <input
        type="text"
        name="taskName"
        value={filterTitle}
        className="col-span-4 md:col-span-2 lg:col-span-3 w-full h-[4.2rem] border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors duration-300"
        placeholder="Tìm kiếm task..."
        onChange={(e) => setFilterTitle(e.target.value)}
      />
      <div className="flex items-center md:gap-5 gap-3 col-span-4 md:col-span-2">
        <select
          name="status"
          value={filterStatus}
          className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors duration-300"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {Object.entries(STATUS).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
        <select
          name="priority"
          value={filterPriority}
          className="w-full h-[4.2rem] rounded-md border border-gray-300 focus:border-cyan-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors duration-300"
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          {Object.entries(PRIORITY).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
