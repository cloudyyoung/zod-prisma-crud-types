"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodField = void 0;
const getZodType_1 = require("./getZodType");
const getZodOptional_1 = require("./getZodOptional");
const getZodField = (field) => {
    return `${field.name}: ${(0, getZodType_1.getZodFieldType)(field)}${(0, getZodOptional_1.getZodOptional)(field)}`;
};
exports.getZodField = getZodField;
//# sourceMappingURL=getZodField.js.map