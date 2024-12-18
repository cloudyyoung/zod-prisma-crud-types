"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodFieldType = void 0;
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
                return 'z.coerce.date()';
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
exports.getZodFieldType = getZodFieldType;
//# sourceMappingURL=getZodType.js.map