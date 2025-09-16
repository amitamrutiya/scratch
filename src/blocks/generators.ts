import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";

// Motion Code Generators
javascriptGenerator.forBlock["move_steps"] = function (
  block: Blockly.Block
): string {
  const steps = block.getFieldValue("STEPS");
  return `move('${(block.workspace as any).spriteId}', ${steps});\n`;
};

javascriptGenerator.forBlock["turn_degrees"] = function (
  block: Blockly.Block
): string {
  const degrees = block.getFieldValue("DEGREES");
  return `turn('${(block.workspace as any).spriteId}', ${degrees});\n`;
};

javascriptGenerator.forBlock["go_to_xy"] = function (
  block: Blockly.Block
): string {
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  return `goTo('${(block.workspace as any).spriteId}', ${x}, ${y});\n`;
};

javascriptGenerator.forBlock["repeat_animation"] = function (
  block: Blockly.Block
): string {
  const times = block.getFieldValue("TIMES");
  const branch = javascriptGenerator.statementToCode(block, "DO");
  return `await repeat('${
    (block.workspace as any).spriteId
  }', ${times}, async function() {\n${branch}});\n`;
};

// Looks Code Generators
javascriptGenerator.forBlock["say_for_seconds"] = function (
  block: Blockly.Block
): string {
  const text = block.getFieldValue("TEXT");
  const seconds = block.getFieldValue("SECONDS");
  return `await say('${
    (block.workspace as any).spriteId
  }', "${text}", ${seconds});\n`;
};

javascriptGenerator.forBlock["think_for_seconds"] = function (
  block: Blockly.Block
): string {
  const text = block.getFieldValue("TEXT");
  const seconds = block.getFieldValue("SECONDS");
  return `await think('${
    (block.workspace as any).spriteId
  }', "${text}", ${seconds});\n`;
};
