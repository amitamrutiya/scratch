import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stage, Layer, Group } from "react-konva";
import {
  addSprite,
  selectSprite,
  setPlaying,
  updateSpritePosition,
} from "../store/spritesSlice";
import animationEngine from "../engine/AnimationEngine";
import CatSprite from "./CatSprite";
import SpeechBubble from "./SpeechBubble";
import { RootState, Sprite } from "../types";

const PreviewArea: React.FC = () => {
  const dispatch = useDispatch();
  const sprites = useSelector((state: RootState) => state.sprites.sprites);
  const selectedSpriteId = useSelector(
    (state: RootState) => state.sprites.selectedSpriteId
  );
  const isPlaying = useSelector((state: RootState) => state.sprites.isPlaying);

  const handlePlay = async (): Promise<void> => {
    dispatch(setPlaying(true));
    try {
      await animationEngine.executeAllSprites();
    } catch (error) {
      console.error("Error during animation execution:", error);
    } finally {
      dispatch(setPlaying(false));
    }
  };

  const handleAddSprite = (): void => {
    dispatch(addSprite());
  };

  const hasCollisions = sprites.some((sprite) => sprite.isColliding);

  const handleSpriteClick = (spriteId: string): void => {
    dispatch(selectSprite(spriteId));
  };

  const handleSpriteDragEnd = (spriteId: string, e: any): void => {
    const node = e.target;
    const nodePos = node.getAbsolutePosition();

    const spriteX = nodePos.x - 240;
    const spriteY = nodePos.y - 180;

    dispatch(
      updateSpritePosition({
        id: spriteId,
        x: spriteX,
        y: spriteY,
      })
    );
  };

  // Convert sprite coordinates to stage coordinates
  const getStagePosition = (sprite: Sprite) => ({
    x: 240 + sprite.x, // Center stage + sprite offset
    y: 180 + sprite.y, // Center stage + sprite offset
  });

  return (
    <div className="flex-none h-full overflow-y-auto p-2 flex flex-col w-full">
      {/* Controls */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className={`px-4 py-2 rounded-lg font-medium ${
              isPlaying
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isPlaying ? "Running..." : "▶ Run All"}
          </button>

          <button
            onClick={handleAddSprite}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
          >
            + Add Sprite
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Selected:{" "}
          <span className="font-medium">
            {sprites.find((s) => s.id === selectedSpriteId)?.name || "None"}
          </span>
          <span className="ml-4 text-blue-600">
            Playing: {isPlaying ? "TRUE" : "FALSE"}
          </span>
          <span className="ml-4 text-green-600">
            Scripts:{" "}
            {sprites.filter((s) => s.script && s.script.trim() !== "").length}/
            {sprites.length}
          </span>
          {hasCollisions && (
            <span className="ml-4 text-red-600 font-medium">
              ⚠️ Collision Detected!
            </span>
          )}
        </div>
      </div>

      {/* Stage */}
      <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex-1">
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {sprites?.map((sprite) => {
              const position = getStagePosition(sprite);
              return (
                <Group
                  key={sprite.id}
                  x={position.x}
                  y={position.y}
                  rotation={sprite.rotation}
                  draggable={true}
                  onClick={() => handleSpriteClick(sprite.id)}
                  onDragEnd={(e) => handleSpriteDragEnd(sprite.id, e)}
                >
                  <CatSprite
                    key={sprite.id}
                    isSelected={sprite.id === selectedSpriteId}
                    isColliding={sprite.isColliding}
                  />

                  {sprite.speechBubble && (
                    <SpeechBubble
                      text={sprite.speechBubble.text}
                      type="speech"
                      x={30}
                      y={-40}
                    />
                  )}

                  {sprite.thoughtBubble && (
                    <SpeechBubble
                      text={sprite.thoughtBubble.text}
                      type="thought"
                      x={30}
                      y={-40}
                    />
                  )}
                </Group>
              );
            })}
          </Layer>
        </Stage>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-sm text-gray-700 mb-2">Sprites</h3>
        <div className="space-y-1">
          {sprites.map((sprite) => (
            <div
              key={sprite.id}
              onClick={() => handleSpriteClick(sprite.id)}
              className={`p-2 rounded cursor-pointer text-sm ${
                sprite.id === selectedSpriteId
                  ? "bg-blue-100 border border-blue-300 text-blue-800"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } ${sprite.isColliding ? "border-red-500 bg-red-50" : ""}`}
            >
              {sprite.name} {sprite.id === selectedSpriteId && "✓"}
              {sprite.isColliding && (
                <span className="ml-2 text-red-600 text-xs">🔴 COLLISION</span>
              )}
              {sprite.script && (
                <div className="text-xs mt-1 opacity-75">
                  Script: {sprite.script}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
