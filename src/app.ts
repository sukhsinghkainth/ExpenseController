import express, { Application, Request, Response } from 'express';
import config from './config/config';
import { db } from './loaders/dbConnect';
import userRoutes from './api/routes/userRoutes';


import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1', userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, how are you?');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
  });

function startServer() {
  try {
    db();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();