import { Router } from 'express';
import { PropertyController } from '../controllers/PropertyController';
import { CreatePropertyUseCase } from '../../application/use-cases/CreatePropertyUseCase';
import { TransferPropertyUseCase } from '../../application/use-cases/TransferPropertyUseCase';
import { TypeOrmPropertyRepository } from '../../infrastructure/persistence/repositories/TypeOrmPropertyRepository';

const router = Router();

// Dependency Injection Assembly with TypeORM Repository
const propertyRepository = new TypeOrmPropertyRepository();
const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository);
const transferPropertyUseCase = new TransferPropertyUseCase(propertyRepository);
const propertyController = new PropertyController(createPropertyUseCase, transferPropertyUseCase);

// Express Routes Mapping
router.post('/properties', propertyController.create);
router.post('/properties/transfer', propertyController.transfer);

export default router;