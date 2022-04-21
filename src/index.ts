// Importing important modules
import express from 'express';
import router from './routes/api';
// init the server
const app = express();
const port = 3000;
app.use('/api', router);
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

export default app;
