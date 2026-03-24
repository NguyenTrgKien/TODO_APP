import {
  CirclePlus,
  Grid2X2,
  LayoutDashboard,
  Moon,
  SunMedium,
  TextAlignJustify,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ActionTaskModel from "./ActionTaskModal";
import { useTheme } from "../hooks/useTheme";

interface HeaderProp {
  viewType: "board" | "list";
  onViewChange: () => void;
}

function Header({ viewType, onViewChange }: HeaderProp) {
  const { toggleTheme } = useTheme();
  const [openActionTaskModal, setOpenActionTaskModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-[6rem] bg-white dark:bg-gray-700 flex items-center justify-between px-[1.5rem] md:px-[3rem] lg:px-[5rem] xl:px-[15rem] shadow-sm z-[500] transition-colors duration-300">
      <div className="flex items-center gap-2.5 text-blue-600 select-none">
        <LayoutDashboard size={22} />
        <h2 className="text-[2rem] font-semibold">TODO</h2>
      </div>
      <div className="flex items-center gap-2.5 md:gap-5 lg:gap-8">
        <button
          className="relative w-[5.5rem] h-[2.8rem] rounded-full bg-gradient-to-r from-amber-300 to-orange-400 dark:from-slate-700 dark:to-slate-900 transition-all duration-300 shadow-md focus:outline-none p-1 border dark:border-gray-500 border-gray-200 "
          onClick={toggleTheme}
        >
          <span className="block w-[2.2rem] h-[2.2rem] rounded-full bg-white dark:bg-gray-200 shadow transition-all duration-300 dark:translate-x-[2.6rem] flex items-center justify-center ">
            <span className="w-5 dark:hidden flex items-center">
              <SunMedium />
            </span>

            <span className="w-5 hidden dark:flex items-center ">
              <Moon />
            </span>
          </span>
        </button>
        <div className="flex items-center justify-between bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 border border-gray-300 rounded-sm transition-colors duration-300">
          <div
            className={`flex items-center gap-2.5 ${viewType === "board" ? "bg-gray-200 dark:bg-gray-500" : ""}  h-[3.2rem] px-3 rounded-tl-sm rounded-bl-sm select-none hover:cursor-pointer transition-colors duration-300`}
            onClick={onViewChange}
          >
            <Grid2X2 size={14} />
            <span className="md:block hidden">Board</span>
          </div>
          <div
            className={`flex items-center gap-2.5  ${viewType === "list" ? "bg-gray-200 dark:bg-gray-500" : ""} h-[3.2rem] px-3 rounded-tr-sm rounded-br-sm select-none hover:cursor-pointer transition-colors duration-300`}
            onClick={onViewChange}
          >
            <TextAlignJustify size={14} />
            <span className="md:block hidden">List</span>
          </div>
        </div>

        <button
          className="flex items-center gap-2.5 h-[3.3rem] px-5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white rounded-md"
          onClick={() => setOpenActionTaskModal(true)}
        >
          <CirclePlus size={14} />
          <span>Thêm task</span>
        </button>
      </div>

      <AnimatePresence>
        {openActionTaskModal && (
          <ActionTaskModel
            action="add"
            dataUpdate={null}
            onClose={() => setOpenActionTaskModal(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
