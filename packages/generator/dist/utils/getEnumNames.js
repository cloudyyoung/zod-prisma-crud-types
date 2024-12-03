"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumNames = void 0;
const getEnumNames = (model) => {
    const nameEnum = `${model.name}Enum`;
    const name = model.name;
    return { nameEnum, name };
};
exports.getEnumNames = getEnumNames;
//# sourceMappingURL=getEnumNames.js.map