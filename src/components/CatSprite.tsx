import React from "react";
import { Group, Path, Circle } from "react-konva";

interface CatSpriteProps {
  isSelected?: boolean;
  isColliding?: boolean;
}

const CatSprite: React.FC<CatSpriteProps> = ({
  isSelected = false,
  isColliding = false,
}) => {
  const selectionColor = isSelected ? "blue" : "transparent";
  const collisionColor = isColliding ? "red" : "transparent";
  const selectionWidth = isSelected ? 3 : 0;

  return (
    <Group>
      {isSelected && (
        <Circle
          x={47.5}
          y={50}
          radius={60}
          stroke={selectionColor}
          strokeWidth={selectionWidth}
          dash={[5, 5]}
          fill="transparent"
        />
      )}

      {isColliding && (
        <Circle
          x={47.5}
          y={50}
          radius={60}
          stroke={collisionColor}
          strokeWidth={selectionWidth}
          dash={[5, 5]}
          fill="transparent"
        />
      )}

      <Path
        data="M 21.9 73.8 C 19.5 73.3 16.6 72.5 14.2 70.3 C 8.7 65.4 7 57.3 3.2 59.4 C -0.7 61.5 -0.6 74.6 11.6 78.6 C 15.8 80 19.6 80 22.7 79.9 C 23.5 79.9 30.4 79.2 32.8 75.8 C 35.2 72.4 33.5 71.5 32.7 71.1 C 31.8 70.6 25.3 74.4 21.9 73.8 Z"
        fill="#FFAB19"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M 3.8 59.6 C 1.8 60.2 0.8 64.4 1.8 67.9 C 2.8 71.4 4.4 73.2 5.7 74.5 C 5.5 73.8 5.1 71.6 6.8 70.3 C 8.9 68.6 12.6 69.5 12.6 69.5 C 12.6 69.5 9.5 65.7 7.9 63 C 6.3 60.7 5.8 59.2 3.8 59.6 Z"
        fill="#FFFFFF"
        strokeWidth={1}
      />

      <Path
        data="M 46.2 76.7 C 47.4 75.8 48.6 74.3 50.2 72 C 51.5 70.1 52.9 66.4 52.9 66.4 C 53.8 63.9 54.4 59.1 51.1 59.2 C 48.9 59.3 46.9 59 43.5 58.5 C 37.5 57.3 36.4 56.5 33.9 60.6 C 31.2 65.4 24.3 68.9 32.8 77.2 C 32.8 77.2 37.7 81 43.6 86.8 C 47.6 90.7 53.9 96.3 56.1 98.2 C 56.6 98.6 57.2 98.8 57.8 98.9 C 67.5 99.8 74.7 98.8 74.7 94.5 C 74.7 87.3 60.4 89.8 60.4 89.8 C 60.4 89.8 55.8 85.9 53.7 84 L 46.2 76.7 Z"
        fill="#FFAB19"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M 50.6 70 C 50.6 70 52.5 67.5 48.2 64.8 C 43.7 61.9 42 65.1 40.2 67.5 C 38.2 70.6 40.2 72.1 42.2 73.9 C 43.8 75.4 45.3 76.6 45.3 76.6 C 45.3 76.6 48.4 74.5 50.6 70 Z"
        fill="#FFFFFF"
        strokeWidth={1}
      />

      <Path
        data="M30.2,68.4 C32.4,71.2 35.8,74.7 31.5,77.6 C25.6,80.9 20.7,70.9 19.7,67.4 C18.8,64.3 21.4,62.3 23.6,60.6 C27.9,57.5 31.5,54.7 35.5,56.2 C40.5,58 36.9,62 34.4,63.8 C32.9,64.9 31.4,66.1 30.3,66.8 C30,67.3 29.9,67.9 30.2,68.4 Z"
        fill="#FFAB19"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M53.6,60.7 C54.1,61.1 60.2,68.3 62.2,66.5 C64.6,64.4 67.9,60.3 71.5,63.6 C75.1,66.9 68.3,72.5 65.4,74 C58.5,77.1 52.9,71.2 51.7,69.6 C50.5,68 48.4,65.3 48.4,62.7 C48.5,59.9 51.9,59.2 53.6,60.7 Z"
        fill="#FFAB19"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cat Head */}
      <Path
        data="M 53.1 9 C 50.8 8.6 48.4 8.4 45.6 8.6 C 40.9 8.8 36.4 10.5 36.4 10.5 L 24.3 2.6 C 23.9 2.4 23.4 2.7 23.5 3.1 L 25.6 21 C 26.2 20.2 15 33.8 22.1 45.2 C 29.2 56.6 44.3 61.7 63.1 58 C 81.9 54.3 86.3 43.5 85.1 37.8 C 83.9 32.1 76.8 30 76.8 30 C 76.8 30 76.7 25.5 73.5 20 C 71.6 16.7 65.2 12 65.2 12 L 62.6 1.3 C 62.5 0.9 62 0.8 61.7 1 L 53.1 9 Z"
        fill="#FFAB19"
        stroke="#001026"
        strokeWidth={1.2}
      />

      <Path
        data="M 76.5 30.4 C 76.5 30.4 83.4 32.2 84.6 37.9 C 85.8 43.6 81 53.9 62.4 57.5 C 38.2 62.5 26.7 48.1 33.4 37.5 C 40.1 26.8 51.6 35.9 60 35.3 C 67.2 34.8 68 28.5 76.5 30.4 Z"
        fill="#FFFFFF"
        strokeWidth={1}
      />

      <Path
        data="M 45 41.1 C 45 40.7 45.4 40.4 45.8 40.5 C 47.7 41.2 53.1 42.8 59.1 43.2 C 64.5 43.5 67.7 43.2 69.2 42.9 C 69.7 42.8 70.1 43.3 69.9 43.8 C 69 46.5 65.2 54 54.7 53.4 C 45.6 52.4 44.7 46 45 41.1 Z"
        fill="#FFFFFF"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M 59.6 32.7 C 61.7 32.7 63.9 32.9 64 33.6 C 64.1 35 62.6 37.8 61 37.9 C 59.2 38.1 55 35.6 55 34 C 54.9 32.8 57.6 32.7 59.6 32.7 Z"
        fill="#001026"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M 46.5 32.5 C 46.2 30.8 47.7 29.3 49.4 29.6 C 51.1 29.9 52.6 31.4 52.3 33.1 C 52 34.8 50.5 36.3 48.8 36 C 47.1 35.7 45.6 34.2 46.5 32.5 Z"
        fill="#001026"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M 68.7 30.9 C 68.4 29.2 69.9 27.7 71.6 28 C 73.3 28.3 74.8 29.8 74.5 31.5 C 74.2 33.2 72.7 34.7 71 34.4 C 69.3 34.1 67.8 32.6 68.7 30.9 Z"
        fill="#001026"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        data="M 83 35.4 C 83 35.4 90.2 35.3 94.9 31.5"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Path
        data="M 83.4 41.3 C 83.4 41.3 87.3 43.2 93.6 42.7"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Path
        data="M 14.6 31.2 C 14.6 31.2 23.2 34 26.7 37.1"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Path
        data="M 22.6 37.8 C 22.6 37.8 28.9 40.4 32.2 43.2"
        stroke="#001026"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Group>
  );
};

export default CatSprite;
