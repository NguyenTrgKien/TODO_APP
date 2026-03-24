import {
  CirclePlus,
  Grid2X2,
  LayoutDashboard,
  TextAlignJustify,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ActionTaskModel from "./ActionTaskModal";

interface HeaderProp {
  viewType: "board" | "list";
  onViewChange: () => void;
}

function Header({ viewType, onViewChange }: HeaderProp) {
  const [openActionTaskModal, setOpenActionTaskModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-[6rem] bg-white flex items-center justify-between px-[1.5rem] md:px-[3rem] lg:px-[5rem] xl:px-[15rem] shadow-sm z-[500]">
      <div className="flex items-center gap-2.5 text-blue-600 select-none">
        <LayoutDashboard size={22} />
        <h2 className="text-[2rem] font-semibold">TODO</h2>
      </div>
      <div className="flex items-center gap-2.5 md:gap-5 lg:gap-10">
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-sm">
          <div
            className={`flex items-center gap-2.5 ${viewType === "board" ? "bg-gray-200" : ""}  h-[3.2rem] px-3 rounded-tl-sm rounded-bl-sm select-none hover:cursor-pointer`}
            onClick={onViewChange}
          >
            <Grid2X2 size={14} />
            <span className="md:block hidden">Board</span>
          </div>
          <div
            className={`flex items-center gap-2.5  ${viewType === "list" ? "bg-gray-200" : ""} h-[3.2rem] px-3 rounded-tr-sm rounded-br-sm select-none hover:cursor-pointer`}
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
