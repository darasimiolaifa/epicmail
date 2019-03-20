import '@babel/polyfill';
import { config } from 'dotenv';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import addAuthRoutes from './routes/authRoutes';
import addMessagesRoutes from './routes/messageRoutes';
import addUsersRoutes from './routes/userRoutes';
import apiDoc from '../docs.json';

config();

const app = express();
const port = process.env.PORT || 3000;

// configure app to use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(apiDoc));


// add API routes to app
addAuthRoutes(app);
addMessagesRoutes(app);
addUsersRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
