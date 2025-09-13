import { store } from "../store";
import {
  updateSpritePosition,
  updateSpriteRotation,
  setSpeechBubble,
  setThoughtBubble,
  clearBubbles,
  setCollisionState,
  stopAllAnimations,
  swapAnimations,
} from "../store/spritesSlice";
import { detectAllCollisions } from "../utils/collisionUtils";
import { Sprite } from "../types";

class AnimationEngine {
  private _collisionDetected: boolean;

  constructor() {
    this._collisionDetected = false;
  }

  // Check for collisions and stop animations if detected
  _checkCollisions = () => {
    const state = store.getState();
    const sprites = state.sprites.sprites;
    const collisions = detectAllCollisions(sprites);

    if (collisions.length > 0 && !this._collisionDetected) {
      this._collisionDetected = true;

      // Mark colliding sprites and swap their animations
      collisions.forEach(({ spriteA, spriteB }) => {
        store.dispatch(
          setCollisionState({ id: spriteA.id, isColliding: true })
        );
        store.dispatch(
          setCollisionState({ id: spriteB.id, isColliding: true })
        );

        // Swap animations between collided sprites
        store.dispatch(
          swapAnimations({
            spriteId1: spriteA.id,
            spriteId2: spriteB.id,
          })
        );
      });

      // Stop all animations temporarily
      store.dispatch(stopAllAnimations());

      console.log(
        `Collision detected! ${collisions.length} collision(s) found. Animations swapped and will.`
      );
      return true;
    }

    return false;
  };

  // Animation functions that will be called by generated code
  move = (spriteId: string, steps: number): void => {
    const sprite = this._getSpriteById(spriteId);
    if (!sprite || sprite.animationStopped) return; // Check if animation should be stopped

    const radians = (sprite.rotation * Math.PI) / 180;
    const newX = sprite.x + Math.cos(radians) * steps;
    const newY = sprite.y + Math.sin(radians) * steps;

    store.dispatch(
      updateSpritePosition({
        id: spriteId,
        x: newX,
        y: newY,
      })
    );

    // Check for collisions after movement
    if (this._checkCollisions()) {
      return; // Stop execution if collision detected
    }
  };

  turn = (spriteId: string, degrees: number): void => {
    const sprite = this._getSpriteById(spriteId);
    if (!sprite || sprite.animationStopped) return; // Check if animation should be stopped

    const newRotation = (sprite.rotation + degrees) % 360;
    store.dispatch(
      updateSpriteRotation({
        id: spriteId,
        rotation: newRotation,
      })
    );

    // Check for collisions after rotation
    if (this._checkCollisions()) {
      return; // Stop execution if collision detected
    }
  };

  goTo = (spriteId: string, x: number, y: number): void => {
    const sprite = this._getSpriteById(spriteId);
    if (!sprite || sprite.animationStopped) return; // Check if animation should be stopped

    store.dispatch(
      updateSpritePosition({
        id: spriteId,
        x: x,
        y: y,
      })
    );

    // Check for collisions after position change
    if (this._checkCollisions()) {
      return; // Stop execution if collision detected
    }
  };

  say = (spriteId: string, text: string, seconds: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      const sprite = this._getSpriteById(spriteId);
      if (!sprite || sprite.animationStopped) {
        resolve(); // Resolve immediately if animation stopped
        return;
      }

      store.dispatch(
        setSpeechBubble({
          id: spriteId,
          text: text,
          duration: seconds * 1000,
        })
      );

      setTimeout(() => {
        store.dispatch(clearBubbles(spriteId));
        resolve();
      }, seconds * 1000);
    });
  };

  think = (spriteId: string, text: string, seconds: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      const sprite = this._getSpriteById(spriteId);
      if (!sprite || sprite.animationStopped) {
        resolve(); // Resolve immediately if animation stopped
        return;
      }

      store.dispatch(
        setThoughtBubble({
          id: spriteId,
          text: text,
          duration: seconds * 1000,
        })
      );

      setTimeout(() => {
        store.dispatch(clearBubbles(spriteId));
        resolve();
      }, seconds * 1000);
    });
  };

  repeat = async (
    spriteId: string,
    count: number,
    callback: () => void
  ): Promise<void> => {
    for (let i = 0; i < count; i++) {
      const sprite = this._getSpriteById(spriteId);
      if (sprite && sprite.animationStopped) {
        break; // Break out of loop if animation stopped
      }

      await new Promise<void>((resolve) => {
        callback();
        setTimeout(resolve, 100); // Small delay between iterations
      });
    }
  };

  // Execute generated code for a sprite
  executeCode = async (spriteId: string, code: string): Promise<void> => {
    if (!code || code.trim() === "") return;

    try {
      // Create a safe execution context with bound functions
      const move = this.move;
      const turn = this.turn;
      const goTo = this.goTo;
      const say = this.say;
      const think = this.think;
      const repeat = this.repeat;

      // Create an async function with the generated code
      const asyncFunction = new Function(
        "move",
        "turn",
        "goTo",
        "say",
        "think",
        "repeat",
        `return (async function() { ${code} })();`
      );

      // Execute the async function
      await asyncFunction(move, turn, goTo, say, think, repeat);
    } catch (error) {
      console.error(`Error executing code for sprite ${spriteId}:`, error);
    }
  };

  // Execute all sprites' code
  executeAllSprites = async (): Promise<void> => {
    const state = store.getState();
    const sprites = state.sprites.sprites;

    // Reset collision state before starting new execution
    // Filter sprites that have actual code to execute
    const spritesWithCode = sprites.filter(
      (sprite) =>
        sprite.script && sprite.script.trim() !== "" && !sprite.animationStopped
    );

    if (spritesWithCode.length === 0) {
      return;
    }

    // Execute all sprites in parallel (each sprite's blocks are sequential, but sprites run together)
    const spritePromises = spritesWithCode.map(async (sprite) => {
      await this.executeCode(sprite.id, sprite.script);
    });

    await Promise.all(spritePromises);
  };

  _getSpriteById = (spriteId: string): Sprite | undefined => {
    const state = store.getState();
    return state.sprites.sprites.find((sprite) => sprite.id === spriteId);
  };
}

export const animationEngine = new AnimationEngine();
export default animationEngine;
