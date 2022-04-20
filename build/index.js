'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
// Importing important modules
const express_1 = __importDefault(require('express'));
const node_path_1 = __importDefault(require('node:path'));
const resize_1 = __importDefault(require('./resize'));
const fs_1 = __importDefault(require('fs'));
// init the server
const app = (0, express_1.default)();
const port = 3000;
app.get('/api', (req, res) => {
    //getting the parameters from url
    const imagename = req.query.name;
    const widthString = req.query.width;
    const heightString = req.query.height;
    let w, h;
    //changing parameters type to number
    if (widthString) {
        w = parseInt(widthString);
    }
    if (heightString) {
        h = parseInt(heightString);
    }
    //cache variable
    if (imagename === undefined && widthString === undefined && heightString === undefined) {
        res.send('Welcome to the image processesing API pass params to proceed');
        return true;
    } else if (fs_1.default.existsSync(node_path_1.default.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`))) {
        console.log('exists');
        res.sendFile(node_path_1.default.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`));
        return true;
    } else if (!fs_1.default.existsSync(node_path_1.default.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`))) {
        res.send('Error:Image not found, please make sure you put the image in images directory');
    } else {
        const wait = (0, resize_1.default)(imagename, w, h);
        Promise.all([wait]).then(() => {
            res.sendFile(node_path_1.default.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`));
        });
    }
});
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
exports.default = app;
