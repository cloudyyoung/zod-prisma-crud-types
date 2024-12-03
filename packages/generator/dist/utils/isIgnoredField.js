"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnoredField = void 0;
const isIgnoredField = (field, ignoredFieldNames) => {
    return (ignoredFieldNames.includes(field.name) ||
        (field.kind !== 'scalar' && field.kind !== 'enum') ||
        field.isId);
};
exports.isIgnoredField = isIgnoredField;
//# sourceMappingURL=isIgnoredField.js.map