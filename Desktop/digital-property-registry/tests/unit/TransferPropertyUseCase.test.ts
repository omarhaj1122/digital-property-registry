import { CreatePropertyUseCase } from '../../src/application/use-cases/CreatePropertyUseCase';
import { TransferPropertyUseCase } from '../../src/application/use-cases/TransferPropertyUseCase';
import { InMemoryPropertyRepository } from '../../src/infrastructure/repositories/InMemoryPropertyRepository';

describe('TransferPropertyUseCase Unit Tests', () => {
  let repository: InMemoryPropertyRepository;
  let createUseCase: CreatePropertyUseCase;
  let transferUseCase: TransferPropertyUseCase;

  beforeEach(async () => {
    repository = new InMemoryPropertyRepository();
    createUseCase = new CreatePropertyUseCase(repository);
    transferUseCase = new TransferPropertyUseCase(repository);

    await createUseCase.execute({
      id: 'prop-test-100',
      parcelNumber: 'P-100',
      ownerId: 'owner-A',
      areaSqm: 300,
      geometryPolygon: 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))',
    });
  });

  it('should transfer ownership to new owner if current owner is correct', async () => {
    const result = await transferUseCase.execute({
      propertyId: 'prop-test-100',
      currentOwnerId: 'owner-A',
      newOwnerId: 'owner-B',
    });

    expect(result.ownerId).toBe('owner-B');
  });

  it('should reject transfer if non-owner attempts it', async () => {
    await expect(
      transferUseCase.execute({
        propertyId: 'prop-test-100',
        currentOwnerId: 'unauthorized-user',
        newOwnerId: 'owner-B',
      })
    ).rejects.toThrow('Unauthorized transfer attempt');
  });
});