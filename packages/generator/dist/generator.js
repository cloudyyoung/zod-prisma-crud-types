"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_helper_1 = require("@prisma/generator-helper");
const sdk_1 = require("@prisma/sdk");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const generators_1 = require("./generators");
const { version } = require('../package.json');
(0, generator_helper_1.generatorHandler)({
    onManifest() {
        sdk_1.logger.info(`${constants_1.GENERATOR_NAME}: Registered`);
        return {
            version,
            defaultOutput: '../generated',
            prettyName: constants_1.GENERATOR_NAME,
        };
    },
    onGenerate: async (options) => {
        var _a;
        const config = options.generator.config;
        const cleanConfig = {
            outputFolder: (_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value,
            ignoredFieldNames: (0, utils_1.getPrismaConfigArrayValue)(config, 'ignoredFieldNames'),
        };
        await (0, utils_1.emptyFolder)(cleanConfig.outputFolder);
        const models = options.dmmf.datamodel.models;
        const enums = options.dmmf.datamodel.enums;
        await Promise.all([
            (0, generators_1.generateSchemas)(models, cleanConfig),
            (0, generators_1.generateEnums)(enums, cleanConfig),
            (0, generators_1.generateUtils)(cleanConfig),
            (0, generators_1.generateIndex)(cleanConfig),
        ]);
    },
});
//# sourceMappingURL=generator.js.map