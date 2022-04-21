"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing important modules
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
// init the server
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', api_1.default);
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
exports.default = app;
