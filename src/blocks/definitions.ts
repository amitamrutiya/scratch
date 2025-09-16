import * as Blockly from "blockly/core";

interface BlockDefinition {
  init: (this: Blockly.Block) => void;
}

export const motionBlocks: Record<string, BlockDefinition> = {
  move_steps: {
    init: function () {
      this.jsonInit({
        type: "move_steps",
        message0: "move %1 steps",
        args0: [
          {
            type: "field_number",
            name: "STEPS",
            value: 10,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#4C97FF",
        tooltip: "Move sprite forward by specified steps",
        helpUrl: "",
      });
    },
  },

  turn_degrees: {
    init: function () {
      this.jsonInit({
        type: "turn_degrees",
        message0: "turn %1 %2 degrees",
        args0: [
          {
            type: "field_image",
            src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNzUgNy41TDcuNSAxMS4yNUwxMS4yNSA3LjUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
            width: 15,
            height: 15,
            alt: "↻",
          },
          {
            type: "field_number",
            name: "DEGREES",
            value: 15,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#4C97FF",
        tooltip: "Turn sprite clockwise by specified degrees",
        helpUrl: "",
      });
    },
  },

  go_to_xy: {
    init: function () {
      this.jsonInit({
        type: "go_to_xy",
        message0: "go to x: %1 y: %2",
        args0: [
          {
            type: "field_number",
            name: "X",
            value: 0,
          },
          {
            type: "field_number",
            name: "Y",
            value: 0,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#4C97FF",
        tooltip: "Go to specific coordinates",
        helpUrl: "",
      });
    },
  },

  repeat_animation: {
    init: function () {
      this.jsonInit({
        type: "repeat_animation",
        message0: "repeat %1 times %2 %3",
        args0: [
          {
            type: "field_number",
            name: "TIMES",
            value: 10,
            min: 1,
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "DO",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#FFAB19",
        tooltip: "Repeat blocks inside specified number of times",
        helpUrl: "",
      });
    },
  },
};

export const looksBlocks: Record<string, BlockDefinition> = {
  say_for_seconds: {
    init: function () {
      this.jsonInit({
        type: "say_for_seconds",
        message0: "say %1 for %2 seconds",
        args0: [
          {
            type: "field_input",
            name: "TEXT",
            text: "Hello!",
          },
          {
            type: "field_number",
            name: "SECONDS",
            value: 2,
            min: 0.1,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#9966FF",
        tooltip: "Display speech bubble with text for specified seconds",
        helpUrl: "",
      });
    },
  },

  think_for_seconds: {
    init: function () {
      this.jsonInit({
        type: "think_for_seconds",
        message0: "think %1 for %2 seconds",
        args0: [
          {
            type: "field_input",
            name: "TEXT",
            text: "Hmm...",
          },
          {
            type: "field_number",
            name: "SECONDS",
            value: 2,
            min: 0.1,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#9966FF",
        tooltip: "Display thought bubble with text for specified seconds",
        helpUrl: "",
      });
    },
  },
};

export const registerBlocks = (): void => {
  Object.entries({ ...motionBlocks, ...looksBlocks }).forEach(
    ([name, block]) => {
      Blockly.Blocks[name] = block;
    }
  );
};
