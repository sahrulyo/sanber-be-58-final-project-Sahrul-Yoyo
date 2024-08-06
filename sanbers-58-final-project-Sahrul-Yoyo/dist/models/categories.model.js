"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { CategoriesModel } from '@/models/categories.model';
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const CategoriesModel = mongoose_1.default.model("Categories", CategoriesSchema);
exports.default = CategoriesModel;
//# sourceMappingURL=categories.model.js.map