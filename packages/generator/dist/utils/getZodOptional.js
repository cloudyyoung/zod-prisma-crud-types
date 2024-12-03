"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodOptional = void 0;
const getZodOptional = (field) => {
    if (!field.isRequired && field.type === 'Json') {
        return '.optional()';
    }
    return field.isRequired ? '' : '.nullish().optional()';
};
exports.getZodOptional = getZodOptional;
//# sourceMappingURL=getZodOptional.js.map