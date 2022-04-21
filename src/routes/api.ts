import express from 'express';
import path from 'node:path';
import fs from 'fs';
import sizing from '../resize';
import { Request, Response } from 'express';

const router = express.Router();
router.get('/', (req: Request, res: Response): void => {
    //getting the parameters from url
    const imagename: any = req.query.name;
    const widthString: any = req.query.width;
    const heightString: any = req.query.height;
    let w: number | null | undefined, h: number | null | undefined;
    //changing parameters type to number
    if (!isNaN(widthString)) {
        w = parseInt(widthString);
    }
    if (!isNaN(heightString)) {
        h = parseInt(heightString);
    }
    if (isNaN(widthString) || isNaN(heightString)) {
        if (widthString === undefined && heightString === undefined) {
            res.sendFile(path.join(__dirname, `../images/${imagename}.jpg`));
        } else {
            res.send('Error: Entered dimensions are invalid please enter a valid number');
        }
    } else if (imagename === undefined && widthString === undefined && heightString === undefined) {
        res.send('Welcome to the image processesing API pass params to proceed');
    } else if (fs.existsSync(path.join(__dirname, `../processed/${imagename}-${w}*${h}.webp`))) {
        console.log('exists');
        res.sendFile(path.join(__dirname, `../processed/${imagename}-${w}*${h}.webp`));
    } else if (!fs.existsSync(path.join(__dirname, `../images/${imagename}.jpg`))) {
        res.send('Error:Image not found, please make sure you put the image in images directory');
    } else {
        const wait = sizing(imagename, w, h);
        Promise.all([wait]).then(() => {
            res.sendFile(path.join(__dirname, `../processed/${imagename}-${w}*${h}.webp`));
        });
    }
});

export default router;
