import { useState } from "react";
import Header from "./components/Header";
import StatBar from "./components/StatBar";
import FilterBar from "./components/Filterbar";
import TaskContainer from "./components/TaskContainer";

function App() {
  const [viewType, setViewType] = useState<"board" | "list">("board");
  const onViewChange = () => {
    setViewType((prev) => (prev === "board" ? "list" : "board"));
  };

  return (
    <div className="font-extralight bg-gray-100 dark:bg-gray-800 min-h-[100vh] text-[1.4rem] md:text-[1.6rem] transition-colors duration-300">
      <Header viewType={viewType} onViewChange={onViewChange} />
      <div className="pt-[8rem] pb-[5rem] px-[1.5rem] md:px-[3rem] lg:px-[5rem] xl:px-[15rem] space-y-10 ">
        <StatBar />
        <FilterBar />
        <TaskContainer viewType={viewType} />
      </div>
    </div>
  );
}

export default App;
