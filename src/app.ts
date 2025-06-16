import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';


const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // ✅ go up from src to root/views

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Error Handling Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  const data = {
    "status": 200,
    "success": true,
    "message": "🚀 Server is renning successfully."
  }
  // res.send(data);
  res.render("index.ejs", {data})
});

export default app;