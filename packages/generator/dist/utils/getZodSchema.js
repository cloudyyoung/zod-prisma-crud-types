"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodSchema = void 0;
const isIgnoredField_1 = require("./isIgnoredField");
const getZodField_1 = require("./getZodField");
const getModelNames_1 = require("./getModelNames");
const getZodSchema = (model, ignoredFieldNames) => {
    const fields = model.fields
        .filter((field) => !(0, isIgnoredField_1.isIgnoredField)(field, ignoredFieldNames))
        .map(getZodField_1.getZodField);
    const { nameCreateSchema, nameCreate, nameUpdateSchema, nameUpdate } = (0, getModelNames_1.getModelNames)(model);
    const content = `
    export const ${nameCreateSchema} = z.object({
      ${fields}
    });

    export type ${nameCreate} = z.infer<typeof ${nameCreateSchema}>;

    export const ${nameUpdateSchema} = ${nameCreateSchema}.partial();

    export type ${nameUpdate} = z.infer<typeof ${nameUpdateSchema}>;
  `;
    return content;
};
exports.getZodSchema = getZodSchema;
//# sourceMappingURL=getZodSchema.js.map