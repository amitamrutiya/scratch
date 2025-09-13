import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { registerBlocks } from "../blocks/definitions";
import "../blocks/generators";
import {
  updateSpriteScript,
  updateSpriteJsonScript,
} from "../store/spritesSlice";
import { RootState } from "../store";

const MidArea: React.FC = () => {
  const dispatch = useDispatch();
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);
  const selectedSpriteId = useSelector(
    (state: RootState) => state.sprites.selectedSpriteId
  );
  const selectedSprite = useSelector((state: RootState) =>
    state.sprites.sprites.find((s) => s.id === selectedSpriteId)
  );

  useEffect(() => {
    // Register custom blocks
    registerBlocks();

    // Initialize Blockly workspace
    if (blocklyDiv.current && !workspace.current) {
      workspace.current = Blockly.inject(blocklyDiv.current, {
        grid: {
          spacing: 20,
          length: 3,
          colour: "#eee",
          snap: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
      });

      // Set sprite ID on workspace for code generation
      (workspace.current as any).spriteId = selectedSpriteId;

      // Listen for changes and generate code
      workspace.current.addChangeListener((event) => {
        if (
          event.type === Blockly.Events.BLOCK_DRAG ||
          event.type === Blockly.Events.SELECTED
        ) {
          return;
        }

        // Get current sprite ID from workspace
        const currentSpriteId = (workspace.current as any).spriteId;

        // Generate JavaScript code
        const code = javascriptGenerator.workspaceToCode(workspace.current!);

        dispatch(
          updateSpriteScript({
            id: currentSpriteId,
            script: code,
          })
        );

        // Save workspace JSON for persistence
        const json = Blockly.serialization.workspaces.save(workspace.current!);
        const jsonString = JSON.stringify(json);
        dispatch(
          updateSpriteJsonScript({
            id: currentSpriteId,
            jsonScript: jsonString,
          })
        );
      });
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []);

  // Update workspace when sprite selection changes
  useEffect(() => {
    if (workspace.current && selectedSprite) {
      (workspace.current as any).spriteId = selectedSpriteId;

      // Clear workspace
      workspace.current.clear();

      // Load sprite's saved workspace JSON if it exists
      if (selectedSprite.jsonScript) {
        const workspaceData = JSON.parse(selectedSprite.jsonScript);
        Blockly.serialization.workspaces.load(workspaceData, workspace.current);
      }
    }
  }, [selectedSpriteId, selectedSprite]);

  // Handle drop from sidebar
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData("blockType");

    if (blockType && workspace.current) {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const ws = workspace.current;
      const injectionDiv = ws.getParentSvg().parentElement as HTMLElement;
      const boundingRect = injectionDiv.getBoundingClientRect();

      // Mouse position relative to workspace div
      const x = clientX - boundingRect.left;
      const y = clientY - boundingRect.top;

      // Convert to Blockly workspace coords
      const wsCoords = Blockly.utils.Coordinate.difference(
        new Blockly.utils.Coordinate(x, y),
        workspace.current.getOriginOffsetInPixels()
      );

      // Create block
      const block = ws.newBlock(blockType);
      block.initSvg();
      block.render();

      // Get block dimensions
      const blockBBox = block.getSvgRoot().getBBox();
      const offsetX = blockBBox.width / 2;
      const offsetY = blockBBox.height / 2;

      // Move so that cursor is at the block center
      block.moveBy(wsCoords.x - offsetX, wsCoords.y - offsetY);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 h-full overflow-hidden relative">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Workspace - {selectedSprite?.name || "No Sprite Selected"}
        </h2>
        <p className="text-sm text-gray-600">
          Drag blocks from the sidebar to build your script
        </p>
      </div>

      <div
        ref={blocklyDiv}
        className="w-full h-full"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ height: "calc(100% - 80px)" }}
      />
    </div>
  );
};

export default MidArea;
