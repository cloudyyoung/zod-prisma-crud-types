"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const emptyFolder = async (folderPath) => {
    if (!fs_1.default.existsSync(folderPath)) {
        return;
    }
    fs_1.default.readdirSync(folderPath).forEach((file) => {
        const curPath = path_1.default.join(folderPath, file);
        if (fs_1.default.lstatSync(curPath).isDirectory()) {
            (0, exports.emptyFolder)(curPath);
            fs_1.default.rmdirSync(curPath);
        }
        else {
            fs_1.default.unlinkSync(curPath);
        }
    });
    fs_1.default.rmdirSync(folderPath);
};
exports.emptyFolder = emptyFolder;
//# sourceMappingURL=emptyFolder.js.map