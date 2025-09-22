import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupDb } from './utils/db';

import predictRoutes from './routes/predictRoutes';
import breedRoutes from './routes/breedRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Simplified CORS configuration
app.use(cors());
app.use(bodyParser.json());

app.use('/api/predict', predictRoutes);
app.use('/api/breed', breedRoutes);

const startServer = async () => {
  await setupDb();
  app.listen(port, () => {
  // Server started
  });
};

startServer();
