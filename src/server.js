import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import addAuthRoutes from './routes/authRoutes';
import addMessagesRoutes from './routes/messageRoutes';

config();

const app = express();
const port = process.env.PORT || 8080;

// configure app to use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'UI')));

// add API routes to app
addAuthRoutes(app);
addMessagesRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
