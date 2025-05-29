import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';


const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Error Handling Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully!');
});

export default app;