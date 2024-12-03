"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndex = void 0;
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
const generateIndex = async (config) => {
    const content = `
      export * from './schemas'
      export * from './enums'
      export * from './utils'
    `;
    const filePath = path_1.default.join(config.outputFolder, `index.ts`);
    console.log(filePath);
    await (0, utils_1.writeFileSafely)(filePath, content);
};
exports.generateIndex = generateIndex;
//# sourceMappingURL=generateIndex.js.map