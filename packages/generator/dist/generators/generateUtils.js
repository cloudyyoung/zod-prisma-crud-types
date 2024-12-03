"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUtils = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const generateUtils = async (config) => {
    const content = `
    import { z } from "zod"

    export const LiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
    export type Literal = z.infer<typeof LiteralSchema>
    export const JsonSchema: z.ZodType = z.lazy(() => z.union([LiteralSchema, z.array(JsonSchema), z.record(JsonSchema)]))
    export type Json = z.infer<typeof JsonSchema>
  `;
    const filePath = path_1.default.join(config.outputFolder, `utils.ts`);
    await (0, utils_1.writeFileSafely)(filePath, content);
};
exports.generateUtils = generateUtils;
//# sourceMappingURL=generateUtils.js.map