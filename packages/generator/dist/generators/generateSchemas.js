"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchemas = void 0;
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
const generateSchemas = async (models, config) => {
    const schemas = models.map((model) => {
        const schema = (0, utils_1.getZodSchema)(model, config.ignoredFieldNames);
        return `
      /**
       *
       * ${model.name}
       * 
       */
      ${schema}
    `;
    });
    const content = `
    import { z } from 'zod';
    import * as utils from './utils';
    import * as enums from './enums';

    ${schemas.join('\n\n')}
  `;
    const filePath = path_1.default.join(config.outputFolder, `schemas.ts`);
    await (0, utils_1.writeFileSafely)(filePath, content);
};
exports.generateSchemas = generateSchemas;
//# sourceMappingURL=generateSchemas.js.map