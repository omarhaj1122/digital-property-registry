import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { AppDataSource } from '../infrastructure/database/data-source';
import propertyRoutes from './routes/PropertyRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', propertyRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ONLINE',
    system: 'Digital Property Registry Engine',
    timestamp: new Date().toISOString(),
  });
});

// Initialize Data Source before starting server
AppDataSource.initialize()
  .then(() => {
    console.log('✅ PostgreSQL Database with PostGIS connected successfully.');
    app.listen(PORT, () => {
      console.log(`--- Digital Property Registry Engine Initializing ---`);
      console.log(`Environment: development`);
      console.log(`Target Port: ${PORT}`);
      console.log(`Server listening live on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failure during engine initialization:', error);
  });