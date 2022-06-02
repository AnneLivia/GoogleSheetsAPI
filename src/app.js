import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import spreadsheetRouter from './routes/SpreadsheetRouter.js';

import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.use('/api', spreadsheetRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.json({message: "Welcome to the API that works with spreadsheets from google"});
});

export default app;