"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnums = void 0;
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
const generateEnums = async (enums, config) => {
    const content = `
    import { z } from 'zod'

    ${enums.map(utils_1.getZodEnum).join('\n')}
  `;
    const filePath = path_1.default.join(config.outputFolder, `enums.ts`);
    await (0, utils_1.writeFileSafely)(filePath, content);
};
exports.generateEnums = generateEnums;
//# sourceMappingURL=generateEnums.js.map