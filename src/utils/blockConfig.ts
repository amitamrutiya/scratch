export interface BlockConfig {
  type: string;
  label: string;
  color: string;
  category: string;
}

export const BLOCK_CATEGORIES = {
  MOTION: "Motion",
  LOOKS: "Looks",
  EVENTS: "Events",
  CONTROL: "Control",
} as const;

export const MOTION_BLOCKS: BlockConfig[] = [
  {
    type: "move_steps",
    label: "move 10 steps",
    color: "bg-blue-500",
    category: BLOCK_CATEGORIES.MOTION,
  },
  {
    type: "turn_degrees",
    label: "turn ↻ 15 degrees",
    color: "bg-blue-500",
    category: BLOCK_CATEGORIES.MOTION,
  },
  {
    type: "go_to_xy",
    label: "go to x: 0 y: 0",
    color: "bg-blue-500",
    category: BLOCK_CATEGORIES.MOTION,
  },
  {
    type: "repeat_animation",
    label: "repeat 10 times",
    color: "bg-yellow-500",
    category: BLOCK_CATEGORIES.MOTION,
  },
];

export const LOOKS_BLOCKS: BlockConfig[] = [
  {
    type: "say_for_seconds",
    label: "say Hello! for 2 seconds",
    color: "bg-purple-500",
    category: BLOCK_CATEGORIES.LOOKS,
  },
  {
    type: "think_for_seconds",
    label: "think Hmm... for 2 seconds",
    color: "bg-purple-500",
    category: BLOCK_CATEGORIES.LOOKS,
  },
];
