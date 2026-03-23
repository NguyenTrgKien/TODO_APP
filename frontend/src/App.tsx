import { useState } from "react";
import Header from "./components/Header";
import StatBar from "./components/StatBar";
import FilterBar from "./components/Filterbar";
import TaskContainer from "./components/TaskContainer";

function App() {
  const [viewType, setViewType] = useState<"board" | "list">("list");

  const onViewChange = () => {
    setViewType((prev) => (prev === "board" ? "list" : "board"));
  };

  return (
    <div className="font-extralight bg-gray-50 min-h-[100vh]">
      <Header viewType={viewType} onViewChange={onViewChange} />
      <div className="pt-[8rem] px-[15rem] space-y-10">
        <StatBar />
        <FilterBar />
        <TaskContainer viewType={viewType} />
      </div>
    </div>
  );
}

export default App;
