import { Sprite } from "../types";

export const createHeroSprite = (
  id: string,
  name: string,
  x: number,
  y: number,
  script: string,
  jsonScript: string | null = null
): Sprite => {
  return {
    id,
    name,
    x,
    y,
    rotation: 0,
    width: 95,
    height: 105,
    script,
    jsonScript,
    speechBubble: null,
    thoughtBubble: null,
    isColliding: false,
    animationStopped: false,
  };
};

export const getHeroFeatureExample = (): Sprite[] => {
  const sprites: Sprite[] = [];

  // Character 1: Moves right with positive steps - With proper block JSON
  const hero1 = createHeroSprite(
    "hero-character-1",
    "Hero 1 (Right Mover)",
    -150,
    0,
    `repeat('hero-character-1', 15, function() {
move('hero-character-1', 10);
});`,
    JSON.stringify({
      blocks: {
        languageVersion: 0,
        blocks: [
          {
            type: "repeat_animation",
            id: "hero1_repeat",
            x: 70,
            y: 70,
            fields: {
              TIMES: 15,
            },
            inputs: {
              DO: {
                block: {
                  type: "move_steps",
                  id: "hero1_move",
                  fields: {
                    STEPS: 10,
                  },
                },
              },
            },
          },
        ],
      },
    })
  );

  // Character 2: Moves left with negative steps - With proper block JSON
  const hero2 = createHeroSprite(
    "hero-character-2",
    "Hero 2 (Left Mover)",
    150,
    0,
    `repeat('hero-character-2', 15, function() {
move('hero-character-2', -10);
});`,
    JSON.stringify({
      blocks: {
        languageVersion: 0,
        blocks: [
          {
            type: "repeat_animation",
            id: "hero2_repeat",
            x: 70,
            y: 70,
            fields: {
              TIMES: 15,
            },
            inputs: {
              DO: {
                block: {
                  type: "move_steps",
                  id: "hero2_move",
                  fields: {
                    STEPS: -10,
                  },
                },
              },
            },
          },
        ],
      },
    })
  );

  sprites.push(hero1, hero2);
  return sprites;
};

