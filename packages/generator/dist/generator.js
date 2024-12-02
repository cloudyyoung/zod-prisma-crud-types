"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_helper_1 = require("@prisma/generator-helper");
const sdk_1 = require("@prisma/sdk");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const writeFileSafely_1 = require("./utils/writeFileSafely");
const { version } = require('../package.json');
(0, generator_helper_1.generatorHandler)({
    onManifest() {
        sdk_1.logger.info(`${constants_1.GENERATOR_NAME}:Registered`);
        return {
            version,
            defaultOutput: '../generated',
            prettyName: constants_1.GENERATOR_NAME,
        };
    },
    onGenerate: async (options) => {
        var _a;
        const promises = options.dmmf.datamodel.models.map((model) => {
            var _a;
            const schemaLocation = path_1.default.join((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value, `${model.name}Schema.ts`);
            const content = getZodSchema(model);
            return (0, writeFileSafely_1.writeFileSafely)(schemaLocation, content);
        });
        await Promise.all(promises);
        const indexLocation = path_1.default.join((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value, `index.ts`);
        const indexContent = getIndexContent(options.dmmf.datamodel.models);
        await (0, writeFileSafely_1.writeFileSafely)(indexLocation, indexContent);
    },
});
const getZodFieldType = (field) => {
    const getType = (type) => {
        switch (type) {
            case 'BigInt':
                return 'z.string()';
            case 'Boolean':
                return 'z.boolean()';
            case 'Bytes':
                return 'z.string()';
            case 'DateTime':
                return 'z.date()';
            case 'Decimal':
                return 'z.number()';
            case 'Float':
                return 'z.number()';
            case 'Int':
                return 'z.number()';
            case 'JSON':
                return 'z.record(z.unknown())';
            case 'String':
                return 'z.string()';
            default:
                return 'z.unknown()';
        }
    };
    if (field.isList) {
        return `z.array(${getType(field.type)})`;
    }
    return getType(field.type);
};
const getZodOptional = (field) => {
    return field.isRequired ? '' : '.optional()';
};
const isIgnoredField = (field) => {
    return (field.name === 'id' ||
        field.isUpdatedAt ||
        field.isGenerated ||
        field.isReadOnly ||
        field.kind !== 'scalar');
};
const getZodField = (field) => {
    if (isIgnoredField(field)) {
        return undefined;
    }
    return `${field.name}: ${getZodFieldType(field)}${getZodOptional(field)}`;
};
const getZodSchema = (model) => {
    const fields = model.fields.map(getZodField).filter(Boolean);
    return `
  import { z } from 'zod';

  export const ${model.name}CreateSchema = z.object({
    ${fields}
  });

  export type ${model.name}Create = z.infer<typeof ${model.name}CreateSchema>;

  export const ${model.name}UpdateSchema = ${model.name}CreateSchema.partial();

  export type ${model.name}Update = z.infer<typeof ${model.name}UpdateSchema>;
  `;
};
const getIndexContent = (models) => {
    return models
        .map((model) => {
        return `export * from './${model.name}Schema'`;
    })
        .join('\n');
};
//# sourceMappingURL=generator.js.map