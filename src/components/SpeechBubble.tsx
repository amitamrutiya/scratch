import React from "react";
import { Group, Rect, Text, Circle } from "react-konva";

interface SpeechBubbleProps {
  text: string;
  type?: "speech" | "thought";
  x?: number;
  y?: number;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  type = "speech",
  x = 0,
  y = 0,
}) => {
  const bubbleWidth = Math.max(text.length * 8, 60);
  const bubbleHeight = 30;

  return (
    <Group x={x} y={y}>
      {/* Main bubble */}
      <Rect
        x={-bubbleWidth / 2}
        y={-bubbleHeight / 2}
        width={bubbleWidth}
        height={bubbleHeight}
        fill="white"
        stroke="#000"
        strokeWidth={2}
        cornerRadius={type === "speech" ? 15 : 5}
      />

      {/* Bubble pointer */}
      {type === "speech" ? (
        <Group>
          {/* Speech bubble pointer (triangle) */}
          <Rect
            x={-5}
            y={bubbleHeight / 2 - 2}
            width={10}
            height={10}
            fill="white"
            stroke="#000"
            strokeWidth={2}
            rotation={45}
          />
        </Group>
      ) : (
        <Group>
          {/* Thought bubble circles */}
          <Circle
            x={-10}
            y={bubbleHeight / 2 + 5}
            radius={3}
            fill="white"
            stroke="#000"
            strokeWidth={1}
          />
          <Circle
            x={-15}
            y={bubbleHeight / 2 + 10}
            radius={2}
            fill="white"
            stroke="#000"
            strokeWidth={1}
          />
          <Circle
            x={-20}
            y={bubbleHeight / 2 + 13}
            radius={1}
            fill="white"
            stroke="#000"
            strokeWidth={1}
          />
        </Group>
      )}

      {/* Text */}
      <Text
        x={-bubbleWidth / 2 + 10}
        y={-bubbleHeight / 2 + 8}
        text={text}
        fontSize={12}
        fontFamily="Arial"
        fill="black"
        width={bubbleWidth - 20}
        align="center"
      />
    </Group>
  );
};

export default SpeechBubble;
