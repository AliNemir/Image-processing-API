// Importing important modules
import express from 'express';
import path from 'node:path';
import sizing from './resize';
import fs from 'fs';
// init the server
const app = express();
const port = 3000;
app.get('/api', (req, res) => {
    //getting the parameters from url
    const imagename: any = req.query.name;
    const widthString: any = req.query.width;
    const heightString: any = req.query.height;
    let w: number | null | undefined, h: number | null | undefined;
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
    } else if (fs.existsSync(path.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`))) {
        console.log('exists');
        res.sendFile(path.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`));
        return true;
    } else if (!fs.existsSync(path.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`))) {
        res.send('Error:Image not found, please make sure you put the image in images directory');
    } else {
        const wait = sizing(imagename, w, h);
        Promise.all([wait]).then(() => {
            res.sendFile(path.join(__dirname, `/processed/${imagename}-${w}*${h}.webp`));
        });
    }
});

app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

export default app;
