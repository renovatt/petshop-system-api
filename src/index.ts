import express from 'express';
import { router } from './router';

const app = express();

app.use(express.json());
app.use(router);
app.listen(3333, () => console.log('server listening on port 3333'))