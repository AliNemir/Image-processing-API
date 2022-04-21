"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const fs_1 = __importDefault(require("fs"));
const resize_1 = __importDefault(require("../resize"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    //getting the parameters from url
    const imagename = req.query.name;
    const widthString = req.query.width;
    const heightString = req.query.height;
    let w, h;
    //changing parameters type to number
    if (!isNaN(widthString)) {
        w = parseInt(widthString);
    }
    if (!isNaN(heightString)) {
        h = parseInt(heightString);
    }
    if (isNaN(widthString) || isNaN(heightString)) {
        if (widthString === undefined && heightString === undefined) {
            res.sendFile(node_path_1.default.join(__dirname, `../images/${imagename}.jpg`));
        }
        else {
            res.send('Error: Entered dimensions are invalid please enter a valid number');
        }
    }
    else if (imagename === undefined && widthString === undefined && heightString === undefined) {
        res.send('Welcome to the image processesing API pass params to proceed');
    }
    else if (fs_1.default.existsSync(node_path_1.default.join(__dirname, `../processed/${imagename}-${w}*${h}.webp`))) {
        console.log('exists');
        res.sendFile(node_path_1.default.join(__dirname, `../processed/${imagename}-${w}*${h}.webp`));
    }
    else if (!fs_1.default.existsSync(node_path_1.default.join(__dirname, `../images/${imagename}.jpg`))) {
        res.send('Error:Image not found, please make sure you put the image in images directory');
    }
    else {
        const wait = (0, resize_1.default)(imagename, w, h);
        Promise.all([wait]).then(() => {
            res.sendFile(node_path_1.default.join(__dirname, `../processed/${imagename}-${w}*${h}.webp`));
        });
    }
});
exports.default = router;
