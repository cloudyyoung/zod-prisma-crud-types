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
        var _a, _b, _c;
        const config = options.generator.config;
        const ignoredFieldNamesString = config.ignoredFieldNames || '';
        const ignoredFieldNames = ignoredFieldNamesString
            .split(',')
            .map((name) => name.trim());
        const promises = options.dmmf.datamodel.models.map((model) => {
            var _a;
            const schemaLocation = path_1.default.join((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value, `${model.name}Schema.ts`);
            const content = getZodSchema(model, ignoredFieldNames);
            return (0, writeFileSafely_1.writeFileSafely)(schemaLocation, content);
        });
        await Promise.all(promises);
        const indexLocation = path_1.default.join((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value, `index.ts`);
        const indexContent = getIndexContent(options.dmmf.datamodel.models);
        await (0, writeFileSafely_1.writeFileSafely)(indexLocation, indexContent);
        const utilsLocation = path_1.default.join((_b = options.generator.output) === null || _b === void 0 ? void 0 : _b.value, `utils.ts`);
        const utilsContent = getUtilsContent();
        await (0, writeFileSafely_1.writeFileSafely)(utilsLocation, utilsContent);
        const enumsLocation = path_1.default.join((_c = options.generator.output) === null || _c === void 0 ? void 0 : _c.value, `enums.ts`);
        const enumsContent = getEnumsContent(options.dmmf.datamodel.enums);
        await (0, writeFileSafely_1.writeFileSafely)(enumsLocation, enumsContent);
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
            case 'Json':
                return 'utils.JsonSchema';
            case 'String':
                return 'z.string()';
            default:
                return 'z.unknown()';
        }
    };
    let zodType = getType(field.type);
    if (field.kind === 'enum') {
        zodType = `enums.${field.type}Enum`;
    }
    if (field.isList) {
        zodType = `z.array(${zodType})`;
    }
    return zodType;
};
const getZodOptional = (field) => {
    if (!field.isRequired && field.type === 'Json') {
        return '.optional()';
    }
    return field.isRequired ? '' : '.nullish().optional()';
};
const isIgnoredField = (field, ignoredFieldNames) => {
    return (ignoredFieldNames.includes(field.name) ||
        (field.kind !== 'scalar' && field.kind !== 'enum') ||
        field.isId);
};
const getZodField = (field) => {
    return `${field.name}: ${getZodFieldType(field)}${getZodOptional(field)}`;
};
const getZodSchema = (model, ignoredFieldNames) => {
    const fields = model.fields
        .filter((field) => !isIgnoredField(field, ignoredFieldNames))
        .map(getZodField);
    return `
  import { z } from 'zod';
  import * as utils from './utils';
  import * as enums from './enums';

  export const ${model.name}CreateSchema = z.object({
    ${fields}
  });

  export type ${model.name}Create = z.infer<typeof ${model.name}CreateSchema>;

  export const ${model.name}UpdateSchema = ${model.name}CreateSchema.partial();

  export type ${model.name}Update = z.infer<typeof ${model.name}UpdateSchema>;
  `;
};
const getIndexContent = (models) => {
    return (models
        .map((model) => {
        return `export * from './${model.name}Schema'`;
    })
        .join('\n') +
        '\n' +
        `
    export * from './enums'
    export * from './utils'
    `);
};
const getUtilsContent = () => {
    return `
    import { z } from "zod"

    export const LiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
    export type Literal = z.infer<typeof LiteralSchema>
    export const JsonSchema: z.ZodType = z.lazy(() => z.union([LiteralSchema, z.array(JsonSchema), z.record(JsonSchema)]))
    export type Json = z.infer<typeof JsonSchema>
  `;
};
const getEnumsContent = (enums) => {
    return `
    import { z } from 'zod'

    ${enums.map(getZodEnum).join('\n')}
  `;
};
const getZodEnum = (em) => {
    return `
  export const ${em.name}Enum = z.enum([${em.values.map((v) => `'${v.name}'`)}]);

  export type ${em.name} = z.infer<typeof ${em.name}Enum>;
  `;
};
//# sourceMappingURL=generator.js.map