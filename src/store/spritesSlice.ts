import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Sprite, SpritesState } from "../types";

function createSprite(id: string, name: string, x: number, y: number): Sprite {
  return {
    id,
    name,
    x,
    y,
    rotation: 0,
    width: 95,
    height: 105,
    script: null,
    jsonScript: null,
    speechBubble: null,
    thoughtBubble: null,
    isColliding: false,
    animationStopped: false,
  };
}

const initialState: SpritesState = {
  sprites: [createSprite("default//sprite", "Sprite 1", 0, 0)],
  selectedSpriteId: "default//sprite",
  isPlaying: false,
};

const spritesSlice = createSlice({
  name: "sprites",
  initialState,
  reducers: {
    addSprite: (state) => {
      const newSprite = createSprite(
        `sprite//${uuidv4()}`,
        `Sprite ${state.sprites.length + 1}`,
        Math.random() * 200,
        Math.random() * 200
      );
      state.sprites.push(newSprite);
      state.selectedSpriteId = newSprite.id;
    },

    selectSprite: (state, action: PayloadAction<string>) => {
      state.selectedSpriteId = action.payload;
    },

    updateSpritePosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.x = x;
        sprite.y = y;
      }
    },

    updateSpriteRotation: (
      state,
      action: PayloadAction<{ id: string; rotation: number }>
    ) => {
      const { id, rotation } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.rotation = rotation;
      }
    },

    updateSpriteScript: (
      state,
      action: PayloadAction<{ id: string; script: any }>
    ) => {
      const { id, script } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.script = script;
      }
    },

    updateSpriteJsonScript: (
      state,
      action: PayloadAction<{ id: string; jsonScript: string | null }>
    ) => {
      const { id, jsonScript } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.jsonScript = jsonScript;
      }
    },

    setSpeechBubble: (
      state,
      action: PayloadAction<{ id: string; text: string; duration: number }>
    ) => {
      const { id, text, duration } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.speechBubble = { text, duration, timestamp: Date.now() };
      }
    },

    setThoughtBubble: (
      state,
      action: PayloadAction<{ id: string; text: string; duration: number }>
    ) => {
      const { id, text, duration } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.thoughtBubble = { text, duration, timestamp: Date.now() };
      }
    },

    clearBubbles: (state, action: PayloadAction<string>) => {
      const sprite = state.sprites.find((s) => s.id === action.payload);
      if (sprite) {
        sprite.speechBubble = null;
        sprite.thoughtBubble = null;
      }
    },

    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setCollisionState: (
      state,
      action: PayloadAction<{ id: string; isColliding: boolean }>
    ) => {
      const { id, isColliding } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        sprite.isColliding = isColliding;
      }
    },

    stopAllAnimations: (state) => {
      state.sprites.forEach((sprite) => {
        sprite.animationStopped = true;
      });
    },

    swapAnimations: (
      state,
      action: PayloadAction<{ spriteId1: string; spriteId2: string }>
    ) => {
      const { spriteId1, spriteId2 } = action.payload;
      const sprite1 = state.sprites.find((s) => s.id === spriteId1);
      const sprite2 = state.sprites.find((s) => s.id === spriteId2);

      if (sprite1 && sprite2) {
        const tempScript = sprite1.script;
        sprite1.script = sprite2.script;
        sprite2.script = tempScript;

        const tempJsonScript = sprite1.jsonScript;
        sprite1.jsonScript = sprite2.jsonScript;
        sprite2.jsonScript = tempJsonScript;

        const tempId = sprite1.id;
        sprite1.id = sprite2.id;
        sprite2.id = tempId;
      }
    },

    resumeAnimations: (state) => {
      state.sprites.forEach((sprite) => {
        sprite.animationStopped = false;
        sprite.isColliding = false;
      });
    },

    loadHeroExample: (state, action: PayloadAction<Sprite[]>) => {
      state.sprites = action.payload;
      state.selectedSpriteId = action.payload[0]?.id || "";
    },
  },
});

export const {
  addSprite,
  selectSprite,
  updateSpritePosition,
  updateSpriteRotation,
  updateSpriteScript,
  updateSpriteJsonScript,
  setSpeechBubble,
  setThoughtBubble,
  clearBubbles,
  setPlaying,
  setCollisionState,
  stopAllAnimations,
  swapAnimations,
  resumeAnimations,
  loadHeroExample,
} = spritesSlice.actions;

export default spritesSlice.reducer;
