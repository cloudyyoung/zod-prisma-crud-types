"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_helper_1 = require("@prisma/generator-helper");
const sdk_1 = require("@prisma/sdk");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const genEnum_1 = require("./helpers/genEnum");
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
        options.dmmf.datamodel.enums.forEach(async (enumInfo) => {
            var _a;
            const tsEnum = (0, genEnum_1.genEnum)(enumInfo);
            const writeLocation = path_1.default.join((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value, `${enumInfo.name}.ts`);
            await (0, writeFileSafely_1.writeFileSafely)(writeLocation, tsEnum);
        });
    },
});
//# sourceMappingURL=generator.js.map