"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodEnum = void 0;
const getEnumNames_1 = require("./getEnumNames");
const getZodEnum = (em) => {
    const values = em.values.map((v) => `'${v.name}'`).join(', ');
    const { name, nameEnum } = (0, getEnumNames_1.getEnumNames)(em);
    return `
    export const ${nameEnum} = z.enum([${values}]);
    export type ${name} = z.infer<typeof ${nameEnum}>;
  `;
};
exports.getZodEnum = getZodEnum;
//# sourceMappingURL=getZodEnum.js.map