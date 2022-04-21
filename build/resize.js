"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
function sizing(input, width, height) {
    const size = (0, sharp_1.default)(__dirname + `/images/${input}.jpg`)
        .resize(width, height, { fit: 'fill' })
        .toFormat('webp')
        .toFile(__dirname + `/processed/${input}-${width}*${height}.webp`);
    return size;
}
exports.default = sizing;
