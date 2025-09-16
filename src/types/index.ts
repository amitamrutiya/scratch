export interface Sprite {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  script: any;
  jsonScript: string | null;
  speechBubble: SpeechBubble | null;
  thoughtBubble: ThoughtBubble | null;
  isColliding: boolean;
  animationStopped: boolean;
}

export interface SpeechBubble {
  text: string;
  duration: number;
  timestamp: number;
}

export interface ThoughtBubble {
  text: string;
  duration: number;
  timestamp: number;
}

export interface SpritesState {
  sprites: Sprite[];
  selectedSpriteId: string;
  isPlaying: boolean;
}

export interface AppState {
  isDragging: boolean;
}

export interface RootState {
  sprites: SpritesState;
  app: AppState;
}

export interface Block {
  type: string;
  label: string;
  color: string;
}
