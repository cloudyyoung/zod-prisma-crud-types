"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaConfigArrayValue = void 0;
const getPrismaConfigArrayValue = (config, key) => {
    const values = config[key];
    if (!values) {
        return [];
    }
    return values.split(',').map((value) => value.trim());
};
exports.getPrismaConfigArrayValue = getPrismaConfigArrayValue;
//# sourceMappingURL=getPrismaConfigArrayValue.js.map