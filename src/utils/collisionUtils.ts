import { Sprite } from "../types";

/**
 * Checks if two sprites are colliding using bounding box detection
 * @param spriteA - First sprite with x, y, width, height properties
 * @param spriteB - Second sprite with x, y, width, height properties
 * @returns True if sprites are colliding
 */
export function detectCollision(spriteA: Sprite, spriteB: Sprite): boolean {
  // Skip collision check if sprites are the same
  if (spriteA.id === spriteB.id) {
    return false;
  }

  // Get sprite dimensions
  const spriteAWidth = spriteA.width;
  const spriteAHeight = spriteA.height;
  const spriteBWidth = spriteB.width;
  const spriteBHeight = spriteB.height;

  // Calculate bounding box collision
  const aLeft = spriteA.x - spriteAWidth / 2;
  const aRight = spriteA.x + spriteAWidth / 2;
  const aTop = spriteA.y - spriteAHeight / 2;
  const aBottom = spriteA.y + spriteAHeight / 2;

  const bLeft = spriteB.x - spriteBWidth / 2;
  const bRight = spriteB.x + spriteBWidth / 2;
  const bTop = spriteB.y - spriteBHeight / 2;
  const bBottom = spriteB.y + spriteBHeight / 2;

  // Check for overlap
  return !(
    aRight < bLeft ||
    aLeft > bRight ||
    aBottom < bTop ||
    aTop > bBottom
  );
}

export function detectAllCollisions(
  sprites: Sprite[]
): { spriteA: Sprite; spriteB: Sprite }[] {
  const collisions: { spriteA: Sprite; spriteB: Sprite }[] = [];

  for (let i = 0; i < sprites.length; i++) {
    for (let j = i + 1; j < sprites.length; j++) {
      if (detectCollision(sprites[i], sprites[j])) {
        collisions.push({
          spriteA: sprites[i],
          spriteB: sprites[j],
        });
      }
    }
  }

  return collisions;
}

export function swapAnimations(
  spriteA: Sprite,
  spriteB: Sprite
): { spriteAUpdate: Sprite; spriteBUpdate: Sprite } {
  const tempScript = spriteA.script;
  return {
    spriteAUpdate: { ...spriteA, script: spriteB.script },
    spriteBUpdate: { ...spriteB, script: tempScript },
  };
}
