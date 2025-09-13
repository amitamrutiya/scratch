import React from "react";
import { Block } from "../types";
import { LOOKS_BLOCKS, MOTION_BLOCKS } from "../utils/blockConfig";

const Sidebar: React.FC = () => {

  const handleBlockDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    blockType: string
  ): void => {
    e.dataTransfer.setData("blockType", blockType);
  };

  const renderBlockCategory = (
    categoryName: string,
    blocks: Block[]
  ): React.ReactElement => (
    <div className="w-full mb-6">
      <div className="font-bold mb-2 text-gray-800">{categoryName}</div>
      {blocks.map((block, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleBlockDragStart(e, block.type)}
          className={`flex flex-row flex-wrap ${block.color} text-white px-3 py-2 my-2 text-sm cursor-pointer rounded shadow-sm hover:shadow-md transition-shadow`}
        >
          {block.label}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {renderBlockCategory("Motion", MOTION_BLOCKS)}

      {renderBlockCategory("Looks", LOOKS_BLOCKS)}
    </div>
  );
};

export default Sidebar;
