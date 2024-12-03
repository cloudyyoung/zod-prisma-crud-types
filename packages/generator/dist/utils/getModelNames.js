"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelNames = void 0;
const getModelNames = (model) => {
    const nameSchema = `${model.name}Schema`;
    const name = model.name;
    const nameCreateSchema = `${model.name}CreateSchema`;
    const nameCreate = `${model.name}Create`;
    const nameUpdateSchema = `${model.name}UpdateSchema`;
    const nameUpdate = `${model.name}Update`;
    return {
        nameSchema,
        name,
        nameCreateSchema,
        nameCreate,
        nameUpdateSchema,
        nameUpdate,
    };
};
exports.getModelNames = getModelNames;
//# sourceMappingURL=getModelNames.js.map